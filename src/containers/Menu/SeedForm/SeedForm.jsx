import React, { useState } from "react";
import { connect } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IoEnter } from "react-icons/io5";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions";

const SeedForm = ({ fetchSudoku }) => {
    const [seed, setSeed] = useState();

    const handleSubmit = () => {
        if (seed) {
            fetchSudoku(seed);
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Load by seed</InputLabel>
            <OutlinedInput
                label="Load by seed"
                onChange={(event) => setSeed(event.target.value)}
                endAdornment={(
                    <InputAdornment position="end">
                        <IconButton onClick={handleSubmit}>
                            <IoEnter />
                        </IconButton>
                    </InputAdornment>
                )}
            />
        </FormControl>
    );
};

SeedForm.propTypes = {
    fetchSudoku: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    fetchSudoku: (seed) => dispatch(actions.fetchSudokuBySeed(seed)),
});

export default connect(null, mapDispatchToProps)(SeedForm);
