import "./Block.css";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRow } from "../../helpers/GridCalculator";
import NoteBlock from "../NoteBlock/NoteBlock";
import * as actions from "../../store/actions";
import { PROP_PUZZLE_NUMBER } from "../../constants/propTypes";

const Block = ({
    number,
    id,
    active,
    setActiveField,
}) => {
    const getClasses = () => {
        const classes = ["Block"];
        if (active !== "") {
            classes.push(active);
        }

        const row = getRow(id);

        if (row % 3 === 0) {
            classes.push("borderTop");
        }

        if (row % 3 === 2) {
            classes.push("borderBottom");
        }

        if (id % 3 === 0) {
            classes.push("borderLeft");
        }

        if (id % 3 === 2) {
            classes.push("borderRight");
        }

        return classes.join(" ");
    };

    const computedNumber = (number > 0 ? number : "");
    const cellValue = Array.isArray(number)
        ? <NoteBlock numbers={number} />
        : computedNumber;

    return (
        <button
            tabIndex={-1}
            type="button"
            className={getClasses()}
            onClick={() => setActiveField({ id, number })}
        >
            {cellValue}
        </button>
    );
};

Block.propTypes = {
    number: PROP_PUZZLE_NUMBER.isRequired,
    id: PropTypes.number.isRequired,
    active: PropTypes.string.isRequired,
    setActiveField: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setActiveField: (activeField) => dispatch(actions.setActiveField(activeField)),
});

export default connect(null, mapDispatchToProps)(Block);
