import { combineReducers } from "redux";
import appReducer from "./app";
import sudokuReducer from "./sudoku";

export default combineReducers({
    app: appReducer,
    sudoku: sudokuReducer,
});
