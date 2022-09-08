import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions";
import { PROP_PUZZLE, SHAPE_ACTIVE_FIELD } from "../../constants/propTypes";

const NumbersGroup = ({
    note,
    puzzle,
    activeField,
    setNumber,
}) => {
    const numbers = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
    };

    for (let i = 0; i < puzzle.length; i += 1) {
        const number = puzzle[i];
        if (!Array.isArray(number) && number > 0) {
            numbers[number] += 1;
        }
    }

    const handleClick = (number) => {
        if (activeField === null) {
            return;
        }
        setNumber(parseInt(number, 10), activeField.id);
    };

    const numberButtons = [];

    Object.keys(numbers).forEach((number) => {
        const count = numbers[number];
        const variant = note ? "outlined" : "contained";
        numberButtons.push(
            <Button
                key={number}
                variant={variant}
                disabled={count === 9}
                onClick={() => handleClick(number)}
            >
                {number}
            </Button>,
        );
    });

    return (
        <ButtonGroup>
            {numberButtons}
        </ButtonGroup>
    );
};

NumbersGroup.propTypes = {
    note: PropTypes.bool.isRequired,
    puzzle: PROP_PUZZLE,
    activeField: SHAPE_ACTIVE_FIELD,
    setNumber: PropTypes.func.isRequired,
};

NumbersGroup.defaultProps = {
    activeField: null,
    puzzle: null,
};

const mapStateToProps = (state) => ({
    note: state.sudoku.note,
    activeField: state.sudoku.activeField,
    puzzle: state.sudoku.puzzle,
});

const mapDispatchToProps = (dispatch) => ({
    setNumber: (number, id) => dispatch(actions.setNumber(number, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumbersGroup);
