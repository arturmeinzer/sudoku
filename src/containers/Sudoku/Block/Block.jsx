import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { rubberBand } from "react-animations";
import { getRow } from "../../../helpers/GridCalculator";
import NoteBlock from "../../../components/NoteBlock/NoteBlock";
import * as actions from "../../../store/actions";
import { PROP_PUZZLE_NUMBER, SHAPE_ACTIVE_FIELD } from "../../../constants/propTypes";
import useFieldType from "../../../hooks/useFieldType";
import {
    FIELD_TYPE_ACTIVE, FIELD_TYPE_ERROR,
    FIELD_TYPE_MARKED,
    FIELD_TYPE_SAME_NUMBER,
} from "../../../constants/fieldTypes";

const shakeAnimation = keyframes`${rubberBand}`;

const StyledButton = styled.button`
    border: 1px solid #aaa;
    font-size: 30px;
    cursor: pointer;
    background: #fff;
    padding: 0;
  
    &:focus {
        outline: none;
    }
  
    ${(props) => (props.row % 3 === 0) && css`
        border-top: 2px solid #000;
    `}

    ${(props) => (props.row % 3 === 2) && css`
        border-bottom: 2px solid #000;
    `}

    ${(props) => (props.id % 3 === 0) && css`
        border-left: 2px solid #000;
    `}

    ${(props) => (props.id % 3 === 2) && css`
        border-right: 2px solid #000;
    `}

    ${(props) => props.fieldType === FIELD_TYPE_ACTIVE && css`
        background: #85C1E9;
    `}

    ${(props) => props.fieldType === FIELD_TYPE_MARKED && css`
        background: #D4E6F1;
    `}

    ${(props) => props.fieldType === FIELD_TYPE_SAME_NUMBER && css`
        background: #D6DBDF;
    `}

    ${(props) => props.fieldType === FIELD_TYPE_ERROR && css`
        background: tomato;
    `}
  
    ${(props) => props.shake && css`
        animation: 1s ${shakeAnimation};
    `}
`;

const Block = ({
    number,
    id,
    activeField,
    setActiveField,
}) => {
    const [fieldType, shake] = useFieldType(id);

    const handleClick = () => {
        setActiveField({ id, number });
    };

    const row = getRow(id);
    const computedNumber = (number > 0 ? number : "");
    const cellValue = Array.isArray(number)
        ? <NoteBlock numbers={number} activeField={activeField} />
        : computedNumber;

    return (
        <StyledButton
            tabIndex={-1}
            type="button"
            id={id}
            row={row}
            fieldType={fieldType}
            shake={shake}
            onClick={handleClick}
        >
            {cellValue}
        </StyledButton>
    );
};

Block.propTypes = {
    number: PROP_PUZZLE_NUMBER.isRequired,
    id: PropTypes.number.isRequired,
    activeField: SHAPE_ACTIVE_FIELD,
    setActiveField: PropTypes.func.isRequired,
};

Block.defaultProps = {
    activeField: null,
};

const mapStateToProps = (state) => ({
    activeField: state.sudoku.activeField,
});

const mapDispatchToProps = (dispatch) => ({
    setActiveField: (activeField) => dispatch(actions.setActiveField(activeField)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Block);
