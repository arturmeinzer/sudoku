import React, { useEffect } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Menu from "./components/Menu/Menu";
import Puzzle from "./components/Puzzle/Puzzle";
import SuccessScreen from "./components/SuccessScreen/SuccessScreen";
import * as actions from "./store/actions";
import useWindowKeyHandler from "./hooks/windowKeyHandler";
import useErrorSound from "./hooks/errorSound";

const App = ({
    difficulty,
    solved,
    loadFromStorage,
}) => {
    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    useWindowKeyHandler();
    useErrorSound();

    const getPage = () => {
        if (difficulty === null) {
            return <Menu />;
        }

        if (solved) {
            return <SuccessScreen />;
        }

        return <Puzzle />;
    };

    return (
        <div className="App">
            <header className="App-header">
                Sudoku
            </header>
            <Container id="main">
                {getPage()}
            </Container>
        </div>
    );
};

App.propTypes = {
    difficulty: PropTypes.string,
    solved: PropTypes.bool.isRequired,
    loadFromStorage: PropTypes.func.isRequired,
};

App.defaultProps = {
    difficulty: null,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    solved: state.sudoku.solved,
});

const mapDispatchToProps = (dispatch) => ({
    loadFromStorage: () => dispatch(actions.loadFromStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
