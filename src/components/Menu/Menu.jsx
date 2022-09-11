import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../Button/Button";
import "./Menu.css";
import {
    DIFFICULTY_EASY,
    DIFFICULTY_MEDIUM,
    DIFFICULTY_HARD,
} from "../../constants/difficulty";
import * as actions from "../../store/actions";

const Menu = ({ onClick, setDifficulty, clearSudoku }) => {
    const handleClick = (difficulty) => {
        clearSudoku();
        setDifficulty(difficulty);
        onClick(false);
    };

    return (
        <div className="Menu">
            <Button onClick={() => handleClick(DIFFICULTY_EASY)}>Easy</Button>
            <Button onClick={() => handleClick(DIFFICULTY_MEDIUM)}>Medium</Button>
            <Button onClick={() => handleClick(DIFFICULTY_HARD)}>Hard</Button>
        </div>
    );
};

Menu.propTypes = {
    onClick: PropTypes.func.isRequired,
    setDifficulty: PropTypes.func.isRequired,
    clearSudoku: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setDifficulty: (difficulty) => dispatch(actions.setDifficulty(difficulty)),
    clearSudoku: () => dispatch(actions.clearSudoku()),
});

export default connect(null, mapDispatchToProps)(Menu);
