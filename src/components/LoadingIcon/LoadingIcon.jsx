import React from "react";
import { Oval } from "react-loading-icons";
import styled from "styled-components";

const Icon = styled(Oval)`
    width: 200px;
    height: 200px;
    margin-top: 50px;
`;

const LoadingIcon = () => (
    <Icon stroke="#85C1E9" />
);

export default LoadingIcon;
