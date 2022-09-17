import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "../../components/Button/Button";
import {
    DIFFICULTY_EASY,
    DIFFICULTY_MEDIUM,
    DIFFICULTY_HARD,
} from "../../constants/difficulty";
import * as actions from "../../store/actions";
import SeedForm from "./SeedForm/SeedForm";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 40px;
`;

const StyledBox = styled(Box)`
    width: 200px;
    margin: 150px auto auto;

    &:focus {
        outline: none;
    }
`;

const Menu = ({
    difficulty,
    loading,
    fetchSudoku,
    hideMenu,
}) => {
    const handleClick = (newDifficulty) => {
        fetchSudoku(newDifficulty);
    };

    return (
        <Container>
            <Button onClick={() => handleClick(DIFFICULTY_EASY)} color="secondary" $large>Easy</Button>
            <Button onClick={() => handleClick(DIFFICULTY_MEDIUM)} color="secondary" $large>Medium</Button>
            <Button onClick={() => handleClick(DIFFICULTY_HARD)} color="secondary" $large>Hard</Button>
            {difficulty
                && <Button onClick={() => hideMenu()} $large>{`Continue (${difficulty})`}</Button>}
            <SeedForm />
            <Modal open={loading}>
                <StyledBox>
                    <LoadingIcon />
                </StyledBox>
            </Modal>
        </Container>
    );
};

Menu.propTypes = {
    difficulty: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    fetchSudoku: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
};

Menu.defaultProps = {
    difficulty: null,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    loading: state.app.loading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSudoku: (difficulty) => dispatch(actions.fetchSudokuByDifficulty(difficulty)),
    hideMenu: () => dispatch(actions.showMenu(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
