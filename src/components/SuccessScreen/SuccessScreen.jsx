import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import * as actions from "../../store/actions";

const SuccessScreen = ({ clearSudoku }) => (
    <div className="Success">
        <h2>Congratulations!</h2>
        <Button onClick={clearSudoku}>New Game</Button>
    </div>
);

SuccessScreen.propTypes = {
    clearSudoku: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    clearSudoku: () => dispatch(actions.clearSudoku()),
});

export default connect(null, mapDispatchToProps)(SuccessScreen);
