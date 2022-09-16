import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SHAPE_ACTIVE_FIELD } from "../../constants/propTypes";
import Note from "../Note/Note";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
`;

const NoteBlock = ({ numbers, activeField }) => {
    const blocks = [];
    for (let i = 1; i <= 9; i += 1) {
        let highlight = false;
        const hasNumber = numbers.indexOf(i) !== -1;
        if (activeField && activeField.number === i && hasNumber) {
            highlight = true;
        }

        blocks.push(
            <Note key={i} highlight={highlight}>
                {hasNumber ? i : ""}
            </Note>,
        );
    }

    return (
        <Container>
            {blocks}
        </Container>
    );
};

NoteBlock.propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    activeField: SHAPE_ACTIVE_FIELD,
};

NoteBlock.defaultProps = {
    activeField: null,
};

export default NoteBlock;
