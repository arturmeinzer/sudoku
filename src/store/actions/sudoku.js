import axios from "axios";
import * as actionTypes from "./actionTypes";

export const setDifficulty = (difficulty) => ({
    type: actionTypes.SUDOKU_SET_DIFFICULTY,
    payload: difficulty,
});

export const setActiveField = (activeField) => ({
    type: actionTypes.SUDOKU_SET_ACTIVE_FIELD,
    payload: activeField,
});

export const setNote = (note) => ({
    type: actionTypes.SUDOKU_SET_NOTE,
    payload: note,
});

export const clearSudoku = () => ({
    type: actionTypes.SUDOKU_CLEAR,
});

export const resetSudoku = () => ({
    type: actionTypes.SUDOKU_RESET,
});

export const setNumber = (number) => ({
    type: actionTypes.SUDOKU_SET_NUMBER,
    payload: number,
});

export const setIsError = (isError) => ({
    type: actionTypes.SUDOKU_SET_IS_ERROR,
    payload: isError,
});

export const fetchSudokuSuccess = (puzzle, solution, seed) => ({
    type: actionTypes.SUDOKU_FETCH,
    payload: {
        puzzle,
        solution,
        seed,
    },
});

export const loadFromStorage = () => (dispatch) => {
    const storedSudoku = localStorage.getItem("sudoku");
    if (storedSudoku !== null) {
        const sudokuObject = JSON.parse(storedSudoku);
        dispatch({
            type: actionTypes.SUDOKU_FETCH_FROM_STORAGE,
            payload: sudokuObject,
        });
    }
};

export const fetchSudokuByDifficulty = (difficulty) => async (dispatch) => {
    const options = {
        method: "GET",
        url: "https://us-central1-sudoku-5f3b9.cloudfunctions.net/fetchSudoku",
        params: {
            difficulty,
        },
    };

    try {
        const response = await axios.request(options);
        const { puzzle, solution, seed } = response.data.data;
        dispatch(fetchSudokuSuccess(puzzle, solution, seed));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const fetchSudokuBySeed = (givenSeed) => async (dispatch) => {
    const options = {
        method: "GET",
        url: "https://sudoku.artur-meinzer.de/api/fetch-sudoku",
        params: {
            seed: givenSeed,
        },
    };

    try {
        const response = await axios.request(options);
        const { puzzle, solution, seed } = response.data.data;
        dispatch(fetchSudokuSuccess(puzzle, solution, seed));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
