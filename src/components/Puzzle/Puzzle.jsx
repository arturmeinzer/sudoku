import styled from "styled-components";

const Puzzle = styled.div`
    display: grid;
    width: 360px;
    grid-template-columns: repeat(9, 40px);
    grid-template-rows: repeat(9, 40px);
    border: 2px solid #000;
    margin: 10px auto;
    @media (min-width: 560px) {
        width: 540px;
        grid-template-columns: repeat(9, 60px);
        grid-template-rows: repeat(9, 60px);
    }
`;

export default Puzzle;
