import axios from "axios";
import * as actionTypes from "./actionTypes";

const FETCH_SUDOKU_URL = "https://sudoku.artur-meinzer.de/api/fetch-sudoku";

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

export const fetchSudoku = () => ({
    type: actionTypes.SUDOKU_FETCH,
});

export const fetchSudokuSuccess = (puzzle, solution, seed, difficulty) => ({
    type: actionTypes.SUDOKU_FETCH_SUCCESS,
    payload: {
        puzzle,
        solution,
        seed,
        difficulty,
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
    dispatch(fetchSudoku());

    const options = {
        method: "GET",
        url: FETCH_SUDOKU_URL,
        params: {
            difficulty,
        },
    };

    try {
        const response = await axios.request(options);
        const {
            puzzle,
            solution,
            seed,
        } = response.data.data;
        dispatch(
            fetchSudokuSuccess(puzzle, solution, seed, difficulty),
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const fetchSudokuBySeed = (givenSeed) => async (dispatch) => {
    dispatch(fetchSudoku());

    const options = {
        method: "GET",
        url: FETCH_SUDOKU_URL,
        params: {
            seed: givenSeed,
        },
    };

    try {
        const response = await axios.request(options);
        const {
            puzzle,
            solution,
            seed,
            difficulty,
        } = response.data.data;
        dispatch(
            fetchSudokuSuccess(puzzle, solution, seed, difficulty.toLowerCase()),
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
