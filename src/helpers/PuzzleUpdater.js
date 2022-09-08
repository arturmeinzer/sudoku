import * as GridCalculator from "./GridCalculator";

const isMarkedField = (active, id) => {
    if (active === null) {
        return false;
    }

    if (active === id) {
        return false;
    }

    if (GridCalculator.getRow(active) === GridCalculator.getRow(id)) {
        return true;
    }

    if (GridCalculator.getColumn(active) === GridCalculator.getColumn(id)) {
        return true;
    }

    return GridCalculator.getQuadrant(active) === GridCalculator.getQuadrant(id);
};

const isError = (id, activePuzzle, solution) => {
    const currentValue = activePuzzle[id];
    if (currentValue === 0) {
        return false;
    }

    // ignore pencil marks
    if (Array.isArray(currentValue)) {
        return false;
    }

    const correctValue = solution[id];

    return currentValue !== correctValue;
};

const isInitialField = (id, initialPuzzle) => initialPuzzle[id] !== 0;

const removePencilMarks = (puzzle, number, id) => {
    const newPuzzle = [...puzzle];
    for (let i = 0; i < puzzle.length; i += 1) {
        if (isMarkedField(id, i) && Array.isArray(puzzle[i])) {
            newPuzzle[i] = [...puzzle[i].filter((item) => item !== number)];
        }
    }

    return newPuzzle;
};

const updateNumber = (puzzle, number, id) => {
    const newPuzzle = [...puzzle];
    newPuzzle[id] = parseInt(number, 10);

    return newPuzzle;
};

const updatePencilMark = (puzzle, number, id) => {
    const newPuzzle = [...puzzle];
    const intNumber = parseInt(number, 10);

    if (!Array.isArray(puzzle[id])) {
        newPuzzle[id] = [intNumber];
        return newPuzzle;
    }

    const index = newPuzzle[id].indexOf(intNumber);
    if (index !== -1) {
        newPuzzle[id] = [...puzzle[id].filter((item) => item !== intNumber)];
    } else {
        newPuzzle[id] = [...puzzle[id], intNumber];
    }

    if (newPuzzle[id].length === 0) {
        newPuzzle[id] = 0;
    }

    return newPuzzle;
};

export {
    updateNumber,
    updatePencilMark,
    removePencilMarks,
    isMarkedField,
    isError,
    isInitialField,
};
