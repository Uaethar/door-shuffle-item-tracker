import { styled } from "styled-components";

export const Button = styled.button<{ selected?: boolean }>`
    height: 26px;
    margin: 2px;
    padding: 3px;
    cursor: pointer;
    background-color: #606060;
    color: #fff;
    outline: none;
    border-color: ${props => props.selected ? 'rgba(111,249,221, 0.7)' : undefined};
`