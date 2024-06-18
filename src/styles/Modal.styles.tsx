import { styled } from "styled-components";
import BaseModal from "styled-react-modal";

export const Modal = BaseModal.styled`
    position: absolute;
    top: 86px;
    left: 66px;
    width: 200px; 
    background-color: #404040;
    border: 1px solid #606060;
    outline: none;
    border-radius: 5px;
    padding: 5px;
`

export const ModalActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
`