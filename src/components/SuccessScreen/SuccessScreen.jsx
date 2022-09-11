import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import * as actions from "../../store/actions";

const SuccessScreen = ({ onClick, clearSudoku }) => {
    const handleClick = () => {
        onClick(true);
        clearSudoku();
    };

    return (
        <div className="Success">
            <h2>Congratulations!</h2>
            <Button onClick={handleClick}>New Game</Button>
        </div>
    );
};

SuccessScreen.propTypes = {
    clearSudoku: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    clearSudoku: () => dispatch(actions.clearSudoku()),
});

export default connect(null, mapDispatchToProps)(SuccessScreen);
