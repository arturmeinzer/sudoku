import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Menu from "./containers/Menu/Menu";
import Puzzle from "./containers/Sudoku/Sudoku";
import SuccessScreen from "./containers/SuccessScreen/SuccessScreen";
import * as actions from "./store/actions";
import useWindowKeyHandler from "./hooks/useWindowKeyHandler";
import useErrorSound from "./hooks/useErrorSound";
import Header from "./components/Header/Header";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const App = ({
    solved,
    showMenu,
    loadFromStorage,
}) => {
    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    useWindowKeyHandler();
    useErrorSound();

    const getPage = () => {
        if (solved) {
            return <SuccessScreen />;
        }

        if (showMenu) {
            return <Menu />;
        }

        return <Puzzle />;
    };

    return (
        <div>
            <Header>Sudoku</Header>
            <Container>
                {getPage()}
            </Container>
        </div>
    );
};

App.propTypes = {
    solved: PropTypes.bool.isRequired,
    showMenu: PropTypes.bool.isRequired,
    loadFromStorage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    puzzle: state.sudoku.puzzle,
    solved: state.sudoku.solved,
    showMenu: state.app.showMenu,
});

const mapDispatchToProps = (dispatch) => ({
    loadFromStorage: () => dispatch(actions.loadFromStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
