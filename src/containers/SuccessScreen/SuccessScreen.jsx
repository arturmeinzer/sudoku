import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import * as actions from "../../store/actions";

const Container = styled.div`
    margin-top: 50px;
`;

const SuccessScreen = ({ clearSudoku, showMenu }) => {
    const handleClick = () => {
        clearSudoku();
        showMenu();
    };

    return (
        <Container>
            <h2>Congratulations!</h2>
            <Button onClick={handleClick}>New Game</Button>
        </Container>
    );
};

SuccessScreen.propTypes = {
    clearSudoku: PropTypes.func.isRequired,
    showMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    clearSudoku: () => dispatch(actions.clearSudoku()),
    showMenu: () => dispatch(actions.showMenu()),
});

export default connect(null, mapDispatchToProps)(SuccessScreen);
