import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import {
    DIFFICULTY_EASY,
    DIFFICULTY_MEDIUM,
    DIFFICULTY_HARD,
} from "../../constants/difficulty";
import * as actions from "../../store/actions";

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 40px;
`;

const Menu = ({ currentDifficulty, setDifficulty, showMenu }) => {
    const handleClick = (difficulty) => {
        setDifficulty(difficulty);
    };

    return (
        <Container>
            <Button onClick={() => handleClick(DIFFICULTY_EASY)} color="secondary" $large>Easy</Button>
            <Button onClick={() => handleClick(DIFFICULTY_MEDIUM)} color="secondary" $large>Medium</Button>
            <Button onClick={() => handleClick(DIFFICULTY_HARD)} color="secondary" $large>Hard</Button>
            {currentDifficulty
                && <Button onClick={() => showMenu(false)} $large>{`Continue (${currentDifficulty})`}</Button>}
        </Container>
    );
};

Menu.propTypes = {
    currentDifficulty: PropTypes.string,
    setDifficulty: PropTypes.func.isRequired,
    showMenu: PropTypes.func.isRequired,
};

Menu.defaultProps = {
    currentDifficulty: null,
};

const mapStateToProps = (state) => ({
    currentDifficulty: state.sudoku.difficulty,
});

const mapDispatchToProps = (dispatch) => ({
    setDifficulty: (difficulty) => dispatch(actions.setDifficulty(difficulty)),
    showMenu: () => dispatch(actions.showMenu(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
