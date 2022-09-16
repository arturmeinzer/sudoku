import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled(Box)`
    display: flex;
    margin: 20px 5px;
    justify-content: space-between;
    font-weight: bold;
`;

const InfoBox = ({ difficulty, errors, seed }) => {
    const difficultyString = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    return (
        <Container>
            <div>{`Difficulty: ${difficultyString}`}</div>
            <div>{`Seed: ${seed}`}</div>
            <div>{`Errors: ${errors}`}</div>
        </Container>
    );
};

InfoBox.propTypes = {
    difficulty: PropTypes.string.isRequired,
    errors: PropTypes.number.isRequired,
    seed: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    difficulty: state.sudoku.difficulty,
    errors: state.sudoku.errors,
    seed: state.sudoku.seed,
});

export default connect(mapStateToProps)(InfoBox);
