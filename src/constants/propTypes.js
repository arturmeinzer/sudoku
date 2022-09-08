import PropTypes from "prop-types";

export const SHAPE_ACTIVE_FIELD = PropTypes.shape({
    id: PropTypes.number,
    number: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]),
});

export const PROP_PUZZLE_NUMBER = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
]);

export const PROP_PUZZLE = PropTypes.arrayOf(PROP_PUZZLE_NUMBER);
