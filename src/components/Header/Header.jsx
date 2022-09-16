import styled from "styled-components";
import PropTypes from "prop-types";

const Header = styled.header`
    background-color: #282c34;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(20px + 2vmin);
    color: white;
`;

Header.propTypes = {
    children: PropTypes.string.isRequired,
};

export default Header;
