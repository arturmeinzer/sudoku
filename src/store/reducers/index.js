import { combineReducers } from "redux";
import sudokuReducer from "./sudoku";

export default combineReducers({
    sudoku: sudokuReducer,
});
