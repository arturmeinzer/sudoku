import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { getRow } from "../../../helpers/GridCalculator";
import NoteBlock from "../../../components/NoteBlock/NoteBlock";
import * as actions from "../../../store/actions";
import { PROP_PUZZLE, PROP_PUZZLE_NUMBER, SHAPE_ACTIVE_FIELD } from "../../../constants/propTypes";
import * as PuzzleUpdater from "../../../helpers/PuzzleUpdater";

const StyledButton = styled.button`
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    border-spacing: 0;
    border: 1px solid #aaa;
    text-align: center;
    vertical-align: middle;
    font-size: 30px;
    cursor: pointer;
    background: #fff;
    padding: 0;
  
    &:focus {
        outline: none;
    }
  
    ${(props) => (props.row % 3 === 0) && css`
        border-top: 2px solid #000;
    `}

    ${(props) => (props.row % 3 === 2) && css`
        border-bottom: 2px solid #000;
    `}

    ${(props) => (props.id % 3 === 0) && css`
        border-left: 2px solid #000;
    `}

    ${(props) => (props.id % 3 === 2) && css`
        border-right: 2px solid #000;
    `}
    
    ${(props) => props.error && css`
        background: tomato;
    `}

    ${(props) => (!props.error && props.active) && css`
        background: #85C1E9;
    `}

    ${(props) => (!props.active && props.marked) && css`
        background: #D4E6F1;
    `}

    ${(props) => (!props.active && props.sameNumber) && css`
        background: #D6DBDF;
    `}
`;

const Block = ({
    number,
    id,
    activeField,
    setActiveField,
    puzzle,
    solution,
}) => {
    const isActive = () => {
        if (activeField === null) {
            return false;
        }
        return id === activeField.id;
    };

    const isMarked = () => {
        const active = activeField !== null ? activeField.id : null;
        return PuzzleUpdater.isMarkedField(active, id);
    };

    const isError = () => PuzzleUpdater.isError(id, puzzle, solution);

    const isSameNumber = () => {
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

    const handleClick = () => {
        setActiveField({ id, number });
    };

    const row = getRow(id);
    const computedNumber = (number > 0 ? number : "");
    const cellValue = Array.isArray(number)
        ? <NoteBlock numbers={number} activeField={activeField} />
        : computedNumber;

    return (
        <StyledButton
            tabIndex={-1}
            type="button"
            id={id}
            row={row}
            active={isActive()}
            marked={isMarked()}
            error={isError()}
            sameNumber={isSameNumber()}
            onClick={handleClick}
        >
            {cellValue}
        </StyledButton>
    );
};

Block.propTypes = {
    number: PROP_PUZZLE_NUMBER.isRequired,
    id: PropTypes.number.isRequired,
    activeField: SHAPE_ACTIVE_FIELD,
    puzzle: PROP_PUZZLE.isRequired,
    solution: PropTypes.arrayOf(PropTypes.number).isRequired,
    setActiveField: PropTypes.func.isRequired,
};

Block.defaultProps = {
    activeField: null,
};

const mapStateToProps = (state) => ({
    activeField: state.sudoku.activeField,
    puzzle: state.sudoku.puzzle,
    solution: state.sudoku.solution,
});

const mapDispatchToProps = (dispatch) => ({
    setActiveField: (activeField) => dispatch(actions.setActiveField(activeField)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Block);
