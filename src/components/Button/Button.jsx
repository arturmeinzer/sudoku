import React from "react";
import "./Button.css";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";

const Button = ({
    onClick,
    variant,
    color,
    children,
}) => (
    <MuiButton
        className="Button"
        variant={variant}
        color={color}
        onClick={onClick}
    >
        {children}
    </MuiButton>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.string.isRequired,
};

Button.defaultProps = {
    color: "primary",
    variant: "contained",
};

export default Button;
