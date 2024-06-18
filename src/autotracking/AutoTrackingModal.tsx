import React from 'react'
import { styled } from 'styled-components'
import Modal from 'styled-react-modal'

const StyledModal = Modal.styled`
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-family: monospace;
    color: #fff
`

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
`

const Button = styled.button<{ selected?: boolean }>`
    height: 26px;
    margin: 2px;
    padding: 3px;
    cursor: pointer;
    background-color: #606060;
    color: #fff;
    outline: none;
    border-color: ${props => props.selected ? 'rgba(111,249,221, 0.7)' : undefined};
`

type Props = {
    open: boolean,
    deviceList: Array<string>,
    handleCancel: VoidFunction,
    closeModal: VoidFunction,
    connect: (device: string) => void
}

const AutoTrackingModal: React.FC<Props> = ({ open, handleCancel, closeModal, connect, deviceList }) => {

    const [device, setDevice] = React.useState<number>()

    const handleConnect = React.useCallback(() => {
        if (typeof device != 'undefined') {
            connect(deviceList[device])
            closeModal()
        }
    }, [deviceList, device, closeModal, connect])

    return <StyledModal
        isOpen={open}
        afterClose={() => setDevice(undefined)}
    >
        <Content>
            <h5>Select device:</h5>
            {deviceList.map((name, index) => <Button key={index} selected={device === index} onClick={() => setDevice(index)}>{name}</Button>)}
            <Actions>
                <Button
                    tabIndex={-1}
                    onClick={() => handleCancel()}
                >
                    CANCEL
                </Button>
                <Button
                    disabled={typeof device === 'undefined'}
                    onClick={() => handleConnect()}
                >
                    CONNECT
                </Button>
            </Actions>
        </Content>
    </StyledModal>
}

export default AutoTrackingModal