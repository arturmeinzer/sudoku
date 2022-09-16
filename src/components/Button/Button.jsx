import { Button as MuiButton } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled(MuiButton)`
    width: ${(props) => (props.$large ? "250px" : "150px")}
`;

Button.propTypes = {
    $large: PropTypes.bool,
};

Button.defaultProps = {
    color: "primary",
    variant: "contained",
    $large: false,
};

export default Button;
