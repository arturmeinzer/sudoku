import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "styled-components";
import PropTypes from "prop-types";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

const StyledBox = styled(Box)`
    width: 200px;
    margin: 150px auto auto;

    &:focus {
        outline: none;
    }
`;

const LoadingModal = ({ open }) => (
    <Modal open={open}>
        <StyledBox>
            <LoadingIcon />
        </StyledBox>
    </Modal>
);

LoadingModal.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default LoadingModal;
