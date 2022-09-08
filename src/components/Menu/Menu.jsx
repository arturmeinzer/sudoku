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

const Menu = ({ setDifficulty }) => (
    <div className="Menu">
        <Button onClick={() => setDifficulty(DIFFICULTY_EASY)}>Easy</Button>
        <Button onClick={() => setDifficulty(DIFFICULTY_MEDIUM)}>Medium</Button>
        <Button onClick={() => setDifficulty(DIFFICULTY_HARD)}>Hard</Button>
    </div>
);

Menu.propTypes = {
    setDifficulty: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setDifficulty: (difficulty) => dispatch(actions.setDifficulty(difficulty)),
});

export default connect(null, mapDispatchToProps)(Menu);
