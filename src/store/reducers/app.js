import * as actionTypes from "../actions/actionTypes";

const initialState = {
    showMenu: true,
    loading: false,
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case actionTypes.SUDOKU_FETCH:
        return {
            ...state,
            loading: true,
        };
    case actionTypes.SUDOKU_FETCH_SUCCESS:
        return {
            ...state,
            showMenu: false,
            loading: false,
        };
    case actionTypes.SUDOKU_CLEAR:
        return {
            ...state,
            showMenu: true,
        };
    case actionTypes.APP_SHOW_MENU:
        return {
            ...state,
            showMenu: action.payload,
        };
    default:
        return state;
    }
};

export default reducer;
