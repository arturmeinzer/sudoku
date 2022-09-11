import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import "./InfoBox.css";

const InfoBox = ({ difficulty, errors }) => {
    const difficultyString = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    return (
        <Box className="InfoBox">
            <div>{difficultyString}</div>
            <div>{`Errors: ${errors}`}</div>
        </Box>
    );
};

InfoBox.propTypes = {
    difficulty: PropTypes.string.isRequired,
    errors: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    errors: state.sudoku.errors,
});

export default connect(mapStateToProps)(InfoBox);
