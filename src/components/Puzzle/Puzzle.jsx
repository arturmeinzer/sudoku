import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as PuzzleUpdater from "../../helpers/PuzzleUpdater";
import Button from "../Button/Button";
import Block from "../Block/Block";
import "./Puzzle.css";
import * as actions from "../../store/actions";
import { DIFFICULTIES_LIST } from "../../constants/difficulty";
import { PROP_PUZZLE, SHAPE_ACTIVE_FIELD } from "../../constants/propTypes";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import NumbersGroup from "../NumbersGroup/NumbersGroup";
import InfoBox from "../InfoBox/InfoBox";

const SQUARES = 81;

const Puzzle = ({
    difficulty,
    puzzle,
    activeField,
    note,
    solution,
    setNote,
    fetchSudoku,
    resetSudoku,
    clearSudoku,
}) => {
    useEffect(() => {
        if (puzzle === null) {
            fetchSudoku(difficulty);
        }
    }, [difficulty, fetchSudoku, puzzle]);

    const isActive = (id) => {
        if (activeField === null) {
            return false;
        }
        return id === activeField.id;
    };

    const isMarked = (id) => {
        const active = activeField !== null ? activeField.id : null;
        return PuzzleUpdater.isMarkedField(active, id);
    };

    const isError = (id, currentPuzzle) => PuzzleUpdater.isError(id, currentPuzzle, solution);

    const isSameNumber = (id) => {
        if (activeField === null) {
            return false;
        }

        const activeValue = activeField.number;
        const currentValue = puzzle[id];

        if (activeValue === 0) {
            return false;
        }

        return activeValue === currentValue;
    };

    const getActiveClass = (id) => {
        if (isError(id, puzzle)) {
            return "error";
        }

        if (isActive(id)) {
            return "active";
        }

        if (isMarked(id)) {
            return "marked";
        }

        if (isSameNumber(id)) {
            return "sameNumber";
        }

        return "";
    };

    if (solution === null) {
        return (
            <div />
        );
    }

    const blocks = [];
    for (let i = 0; i < SQUARES; i += 1) {
        blocks.push(
            <Block
                key={i}
                id={i}
                number={puzzle[i]}
                active={getActiveClass(i)}
            />,
        );
    }

    return (
        <div id="Sudoku">
            <InfoBox />
            <div id="Puzzle">
                {blocks}
            </div>
            <ButtonGroup>
                <Button onClick={() => setNote(!note)} variant={note ? "outlined" : "contained"}>Note (n)</Button>
                <NumbersGroup />
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={() => resetSudoku()} color="secondary">
                    Reset
                </Button>
                <Button onClick={() => clearSudoku()} color="secondary">
                    New Game
                </Button>
            </ButtonGroup>
        </div>
    );
};

Puzzle.propTypes = {
    difficulty: PropTypes.oneOf(DIFFICULTIES_LIST).isRequired,
    activeField: SHAPE_ACTIVE_FIELD,
    puzzle: PROP_PUZZLE,
    note: PropTypes.bool.isRequired,
    solution: PropTypes.arrayOf(PropTypes.number),
    setNote: PropTypes.func.isRequired,
    fetchSudoku: PropTypes.func.isRequired,
    resetSudoku: PropTypes.func.isRequired,
    clearSudoku: PropTypes.func.isRequired,
};

Puzzle.defaultProps = {
    activeField: null,
    solution: null,
    puzzle: null,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    note: state.sudoku.note,
    activeField: state.sudoku.activeField,
    solution: state.sudoku.solution,
    puzzle: state.sudoku.puzzle,
});

const mapDispatchToProps = (dispatch) => ({
    setNote: (note) => dispatch(actions.setNote(note)),
    fetchSudoku: (difficulty) => dispatch(actions.fetchSudoku(difficulty)),
    resetSudoku: () => dispatch(actions.resetSudoku()),
    clearSudoku: () => dispatch(actions.clearSudoku()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
