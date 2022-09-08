import React from "react";
import "./NoteBlock.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SHAPE_ACTIVE_FIELD } from "../../constants/propTypes";

const NoteBlock = ({ numbers, activeField }) => {
    const blocks = [];
    for (let i = 1; i <= 9; i += 1) {
        const classes = ["Note"];
        const hasNumber = numbers.indexOf(i) !== -1;
        if (activeField && activeField.number === i && hasNumber) {
            classes.push("active");
        }
        blocks.push(
            <div className={classes.join(" ")} key={i}>
                {hasNumber ? i : ""}
            </div>,
        );
    }

    return (
        <div className="NoteBlock">
            {blocks}
        </div>
    );
};

NoteBlock.propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    activeField: SHAPE_ACTIVE_FIELD,
};

NoteBlock.defaultProps = {
    activeField: null,
};

const mapStateToProps = (state) => ({
    activeField: state.sudoku.activeField,
});

export default connect(mapStateToProps)(NoteBlock);
