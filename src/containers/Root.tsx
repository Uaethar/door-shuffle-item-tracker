import React from 'react';
import App from './App'
import { ModalProvider } from 'styled-react-modal'
import { styled } from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(35,35,35,0.75);
`

const Root = () => <React.StrictMode>
    <ModalProvider backgroundComponent={ModalBackground} >
        <App />
    </ModalProvider>
</React.StrictMode>

export default Root