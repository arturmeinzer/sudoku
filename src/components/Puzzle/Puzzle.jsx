import styled from "styled-components";

const Puzzle = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 60px);
    grid-template-rows: repeat(9, 60px);
    border: 2px solid #000;
    margin: 10px 0;
    width: 540px;
    height: 540px;
`;

export default Puzzle;
