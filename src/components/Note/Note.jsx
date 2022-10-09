import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Note = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    line-height: 9px;
    font-size: 9px;
    text-align: center;
    vertical-align: middle;
    color: #555;
    margin: 1px;

    @media(min-width: 560px) {
        width: 14px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        margin: 2px;
    }
  
    ${(props) => props.highlight && css`
        background: cornflowerblue;
        color: #fff;
    `}
`;

Note.propTypes = {
    highlight: PropTypes.bool.isRequired,
};

export default Note;
