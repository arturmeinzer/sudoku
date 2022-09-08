const getRow = (id) => Math.floor(id / 9);

const getColumn = (id) => id % 9;

const getQuadrant = (id) => {
    const row = getRow(id);
    const column = getColumn(id);

    return (Math.floor(row / 3) * 3)
        + Math.floor(column / 3);
};

export {
    getRow,
    getColumn,
    getQuadrant,
};
