import * as actionTypes from "../actions/actionTypes";
import * as PuzzleUpdater from "../../helpers/PuzzleUpdater";

const initialState = {
    difficulty: null,
    solved: false,
    activeField: null,
    note: false,
    puzzle: null,
    initialPuzzle: null,
    solution: null,
    seed: 0,
    errors: 0,
    isError: false,
};

const setNumber = (state, number) => {
    if (state.activeField === null) {
        return state;
    }

    const { id } = state.activeField;

    if (PuzzleUpdater.isInitialField(id, state.initialPuzzle)) {
        return {
            ...state,
            isError: true,
        };
    }

    let newPuzzle;
    let errors = state.errors ?? 0;
    let isError = false;

    if (number === 0) {
        newPuzzle = PuzzleUpdater.updateNumber(state.puzzle, number, id);
    } else if (state.note) {
        newPuzzle = PuzzleUpdater.updatePencilMark(state.puzzle, number, id);
    } else {
        newPuzzle = PuzzleUpdater.updateNumber(state.puzzle, number, id);
        isError = PuzzleUpdater.isError(id, newPuzzle, state.solution);
        if (!isError) {
            newPuzzle = PuzzleUpdater.removePencilMarks(newPuzzle, number, id);
        } else {
            errors += 1;
        }
    }

    const activeField = { id, number: newPuzzle[id] };

    let solved = false;
    if (JSON.stringify(state.solution) === JSON.stringify(newPuzzle)) {
        solved = true;
    }

    return {
        ...state,
        puzzle: newPuzzle,
        solved,
        errors,
        activeField,
        isError,
    };
};

const updateStorage = (storageObject) => {
    const storageString = JSON.stringify({
        ...storageObject,
        activeField: null,
        note: false,
    });

    localStorage.setItem("sudoku", storageString);
    return storageObject;
};

const clearStorage = () => {
    localStorage.clear();
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case actionTypes.SUDOKU_SET_ACTIVE_FIELD:
        return {
            ...state,
            activeField: action.payload,
        };

    case actionTypes.SUDOKU_SET_NOTE:
        return {
            ...state,
            note: action.payload,
        };

    case actionTypes.SUDOKU_FETCH_SUCCESS:
        return updateStorage({
            ...state,
            initialPuzzle: action.payload.puzzle,
            puzzle: action.payload.puzzle,
            solution: action.payload.solution,
            seed: action.payload.seed,
            difficulty: action.payload.difficulty,
        });

    case actionTypes.SUDOKU_RESET:
        return updateStorage({
            ...state,
            puzzle: [...state.initialPuzzle],
            activeField: null,
            errors: 0,
        });

    case actionTypes.SUDOKU_SET_NUMBER:
        return updateStorage(
            setNumber(state, action.payload),
        );

    case actionTypes.SUDOKU_SET_IS_ERROR:
        return updateStorage({
            ...state,
            isError: action.payload,
        });

    case actionTypes.SUDOKU_CLEAR:
        clearStorage();
        return initialState;

    case actionTypes.SUDOKU_FETCH_FROM_STORAGE:
        return action.payload;

    default:
        return state;
    }
};

export default reducer;
