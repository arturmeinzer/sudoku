import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import "./ButtonGroup.css";

const ButtonGroup = ({ children }) => (
    <Box className="ButtonGroup">
        {children}
    </Box>
);

ButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ButtonGroup;
