import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import * as GridCalculator from "../helpers/GridCalculator";

const useWindowKeyHandler = () => {
    const dispatch = useDispatch();
    const { activeField, note, puzzle } = useSelector((state) => state.sudoku);

    const isMove = (key) => {
        const array = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
        return array.includes(key);
    };

    const moveCursor = useCallback((key) => {
        let activeId = activeField.id;
        switch (key) {
        case "ArrowDown":
            activeId += 9;
            if (activeId > 81) {
                activeId = activeField.id;
            }
            break;
        case "ArrowUp":
            activeId -= 9;
            if (activeId < 0) {
                activeId = activeField.id;
            }
            break;
        case "ArrowLeft":
            activeId -= 1;
            if (GridCalculator.getRow(activeId) !== GridCalculator.getRow(activeField.id)) {
                activeId = activeField.id;
            }
            break;
        case "ArrowRight":
            activeId += 1;
            if (GridCalculator.getRow(activeId) !== GridCalculator.getRow(activeField.id)) {
                activeId = activeField.id;
            }
            break;
        default:
            break;
        }

        if (activeId !== activeField.id) {
            dispatch(actions.setActiveField({ id: activeId, number: puzzle[activeId] }));
        }
    }, [activeField, puzzle, dispatch]);

    const keydown = useCallback((event) => {
        if (event.key === "n") {
            dispatch(actions.setNote(!note));
            return;
        }

        if (activeField === null) {
            return;
        }

        if (isMove(event.key)) {
            moveCursor(event.key);
            return;
        }

        let keyNumber = 0;
        if (event.key === "Backspace" || event.key === "Delete") {
            dispatch(actions.setNumber(keyNumber, activeField.id));
        } else {
            keyNumber = event.keyCode - 48;
            if (keyNumber >= 1 && keyNumber <= 9) {
                dispatch(actions.setNumber(keyNumber, activeField.id));
            }
        }
    }, [activeField, moveCursor, note, dispatch]);

    useEffect(() => {
        window.addEventListener("keydown", keydown);
        return () => {
            window.removeEventListener("keydown", keydown);
        };
    }, [keydown]);
};

export default useWindowKeyHandler;
