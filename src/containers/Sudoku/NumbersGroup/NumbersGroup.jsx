import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions";
import { PROP_PUZZLE } from "../../../constants/propTypes";

const NumbersGroup = ({
    note,
    puzzle,
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
        setNumber(parseInt(number, 10));
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
    setNumber: PropTypes.func.isRequired,
};

NumbersGroup.defaultProps = {
    puzzle: null,
};

const mapStateToProps = (state) => ({
    note: state.sudoku.note,
    puzzle: state.sudoku.puzzle,
});

const mapDispatchToProps = (dispatch) => ({
    setNumber: (number) => dispatch(actions.setNumber(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumbersGroup);
