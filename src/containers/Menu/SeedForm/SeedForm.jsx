import React, { useState } from "react";
import { connect } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IoEnter } from "react-icons/io5";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import { FormHelperText, OutlinedInput } from "@mui/material";
import * as actions from "../../../store/actions";

const SeedForm = ({ fetchSudoku }) => {
    const [seed, setSeed] = useState();
    const [isError, setError] = useState(false);

    const handleSubmit = () => {
        if (seed) {
            fetchSudoku(seed);
        } else {
            setError(true);
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSeed(value);
        setError(value.length === 0);
    };

    return (
        <FormControl fullWidth>
            <InputLabel error={isError}>Load by seed</InputLabel>
            <OutlinedInput
                label="Load by seed"
                onChange={handleChange}
                error={isError}
                placeholder=""
                endAdornment={(
                    <InputAdornment position="end">
                        <IconButton onClick={handleSubmit}>
                            <IoEnter />
                        </IconButton>
                    </InputAdornment>
                )}
            />
            {isError && <FormHelperText error>Empty Seed</FormHelperText>}
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
