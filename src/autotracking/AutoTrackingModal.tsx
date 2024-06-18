import React from 'react'
import { styled } from 'styled-components'
import { Button } from '../styles/Button.styles'
import { Modal, ModalActions } from '../styles/Modal.styles'


const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-family: monospace;
    color: #fff
`

const Title = styled.h4`
    padding: 0 3px;
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

    return <Modal
        isOpen={open}
        afterClose={() => setDevice(undefined)}
    >
        <Content>
            <Title>Select device:</Title>
            {deviceList.map((name, index) => <Button key={index} selected={device === index} onClick={() => setDevice(index)}>{name}</Button>)}
        </Content>
        <ModalActions>
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
        </ModalActions>
    </Modal>
}

export default AutoTrackingModal