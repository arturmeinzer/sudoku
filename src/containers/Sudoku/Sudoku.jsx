import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Block from "./Block/Block";
import * as actions from "../../store/actions";
import { DIFFICULTIES_LIST } from "../../constants/difficulty";
import { PROP_PUZZLE } from "../../constants/propTypes";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import NumbersGroup from "./NumbersGroup/NumbersGroup";
import InfoBox from "./InfoBox/InfoBox";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import Puzzle from "../../components/Puzzle/Puzzle";

const SQUARES = 81;

const Container = styled.div`
    width: 544px;
`;

const Sudoku = ({
    difficulty,
    puzzle,
    note,
    setNote,
    fetchSudoku,
    resetSudoku,
    clearSudoku,
}) => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        if (puzzle === null && difficulty) {
            fetchSudoku(difficulty);
        }
    }, [difficulty, fetchSudoku, puzzle]);

    useEffect(() => {
        if (puzzle === null) {
            return;
        }

        const newBlocks = [];
        for (let i = 0; i < SQUARES; i += 1) {
            newBlocks.push(
                <Block
                    key={i}
                    id={i}
                    number={puzzle[i]}
                />,
            );
        }
        setBlocks(newBlocks);
    }, [puzzle]);

    if (puzzle === null) {
        return (
            <LoadingIcon />
        );
    }

    return (
        <Container>
            <InfoBox />
            <Puzzle>
                {blocks}
            </Puzzle>
            <ButtonGroup>
                <Button onClick={() => setNote(!note)} variant={note ? "outlined" : "contained"}>Note (n)</Button>
                <NumbersGroup />
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={() => resetSudoku()} color="secondary">Reset</Button>
                <Button onClick={() => clearSudoku()} color="secondary">New Game</Button>
            </ButtonGroup>
        </Container>
    );
};

Sudoku.propTypes = {
    difficulty: PropTypes.oneOf(DIFFICULTIES_LIST),
    puzzle: PROP_PUZZLE,
    note: PropTypes.bool.isRequired,
    setNote: PropTypes.func.isRequired,
    fetchSudoku: PropTypes.func.isRequired,
    resetSudoku: PropTypes.func.isRequired,
    clearSudoku: PropTypes.func.isRequired,
};

Sudoku.defaultProps = {
    puzzle: null,
    difficulty: null,
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

export default connect(mapStateToProps, mapDispatchToProps)(Sudoku);
