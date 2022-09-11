import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Menu from "./components/Menu/Menu";
import Puzzle from "./components/Puzzle/Puzzle";
import SuccessScreen from "./components/SuccessScreen/SuccessScreen";
import * as actions from "./store/actions";
import useWindowKeyHandler from "./hooks/windowKeyHandler";
import useErrorSound from "./hooks/errorSound";
import { PROP_PUZZLE } from "./constants/propTypes";
import Button from "./components/Button/Button";

const App = ({
    difficulty,
    puzzle,
    solved,
    loadFromStorage,
}) => {
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {
        if (difficulty === null && showMenu === false) {
            setShowMenu(true);
        }
    }, [difficulty, showMenu, setShowMenu]);

    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    useWindowKeyHandler();
    useErrorSound();

    const getMenuPage = useCallback(() => {
        if (puzzle === null) {
            return <Menu onClick={setShowMenu} />;
        }

        const buttonText = `Continue (${difficulty})`;
        return (
            <>
                <Menu onClick={setShowMenu} />
                <Button
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {buttonText}
                </Button>
            </>
        );
    }, [puzzle, difficulty, setShowMenu, showMenu]);

    const getPage = () => {
        if (solved) {
            return <SuccessScreen onClick={setShowMenu} />;
        }

        if (showMenu) {
            return getMenuPage();
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
    puzzle: PROP_PUZZLE,
    solved: PropTypes.bool.isRequired,
    loadFromStorage: PropTypes.func.isRequired,
};

App.defaultProps = {
    difficulty: null,
    puzzle: null,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    puzzle: state.sudoku.puzzle,
    solved: state.sudoku.solved,
});

const mapDispatchToProps = (dispatch) => ({
    loadFromStorage: () => dispatch(actions.loadFromStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
