import { useSelector } from "react-redux";
import * as PuzzleUpdater from "../helpers/PuzzleUpdater";
import {
    FIELD_TYPE_ACTIVE,
    FIELD_TYPE_ERROR,
    FIELD_TYPE_MARKED,
    FIELD_TYPE_SAME_NUMBER,
} from "../constants/fieldTypes";

const useFieldType = (id) => {
    const { activeField, puzzle, solution } = useSelector((state) => state.sudoku);

    const isActive = () => {
        if (activeField === null) {
            return false;
        }
        return id === activeField.id;
    };

    const isMarked = () => {
        const active = activeField !== null ? activeField.id : null;
        return PuzzleUpdater.isMarkedField(active, id);
    };

    const isError = () => PuzzleUpdater.isError(id, puzzle, solution);

    const isSameNumber = () => {
        if (activeField === null) {
            return false;
        }

        const activeValue = activeField.number;
        const currentValue = puzzle[id];

        if (activeValue === 0) {
            return false;
        }

        return activeValue === currentValue;
    };

    const getFieldType = () => {
        if (isError()) {
            return FIELD_TYPE_ERROR;
        }

        if (isActive()) {
            return FIELD_TYPE_ACTIVE;
        }

        if (isSameNumber()) {
            return FIELD_TYPE_SAME_NUMBER;
        }

        if (isMarked()) {
            return FIELD_TYPE_MARKED;
        }

        return "";
    };

    const fieldType = getFieldType();
    const shake = (isSameNumber() && isMarked() && !isError());

    return [fieldType, shake];
};

export default useFieldType;
