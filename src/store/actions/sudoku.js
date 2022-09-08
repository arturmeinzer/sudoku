import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as PuzzleTransformer from "../../helpers/PuzzleTransformer";

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

export const setNumber = (number, id) => ({
    type: actionTypes.SUDOKU_SET_NUMBER,
    payload: {
        number,
        id,
    },
});

export const setIsError = (isError) => ({
    type: actionTypes.SUDOKU_SET_IS_ERROR,
    payload: isError,
});

export const fetchSudokuSuccess = (puzzle, solution) => ({
    type: actionTypes.SUDOKU_FETCH,
    payload: {
        puzzle,
        solution,
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

const fetchSolution = async (loadedPuzzle) => {
    const options = {
        method: "GET",
        url: "https://sudoku-generator1.p.rapidapi.com/sudoku/solve",
        params: {
            puzzle: loadedPuzzle,
        },
        headers: {
            "X-RapidAPI-Key": "4cd9cae020mshdad01a2e8def8fcp1a9fadjsne5b2142c5956",
            "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        // eslint-disable-next-line no-console
        console.log(response.data);
        return PuzzleTransformer.transform(response.data.solution);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
    }
};

export const fetchSudoku = (difficulty) => async (dispatch) => {
    const options = {
        method: "GET",
        url: "https://sudoku-generator1.p.rapidapi.com/sudoku/generate",
        params: {
            difficulty,
        },
        headers: {
            "X-RapidAPI-Key": "4cd9cae020mshdad01a2e8def8fcp1a9fadjsne5b2142c5956",
            "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        const puzzle = PuzzleTransformer.transform(response.data.puzzle);
        // eslint-disable-next-line no-console
        console.log(response.data);
        const solution = await fetchSolution(response.data.puzzle);
        dispatch(fetchSudokuSuccess(puzzle, solution));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
