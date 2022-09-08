const transform = (valuesString) => {
    const puzzleArray = [];
    for (let i = 0; i < valuesString.length; i += 1) {
        puzzleArray.push(valuesString[i] === "." ? 0 : parseInt(valuesString[i], 10));
    }

    return puzzleArray;
};

export {
    // eslint-disable-next-line import/prefer-default-export
    transform,
};
