import React from 'react'
import { AppContext } from '../config/context'
import { DUNGEONS, ItemsFromWebSocket } from '../config/types'
import AutoTrackingModal from './AutoTrackingModal'
import { getAddressOffsets, getItemForDungeon } from './utils'
import { styled } from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 3px;
`

const Message = styled.div`
    margin-right: 5px;
    text-align: right;
`

const Button = styled.button`
    height: 26px;
    margin: 2px;
    padding: 3px;
    cursor: pointer;
    background-color: #606060;
    color: #fff;
    outline: none;
`

const AutoTrackingToggle: React.FC = () => {

    const [ws, setWs] = React.useState<WebSocket>()
    const [message, setMessage] = React.useState("Auto tracking disabled")
    const error = React.useRef("")
    const resetMessageTimeout = React.useRef<ReturnType<typeof setTimeout>>()
    const displayMessage = React.useCallback((message: string, autoHide: boolean = false) => {
        if (resetMessageTimeout.current) {
            clearTimeout(resetMessageTimeout.current)
        }
        setMessage(message)
        if (autoHide) {
            resetMessageTimeout.current = setTimeout(() => setMessage("Auto tracking disabled"), 5000)
        }
    }, [resetMessageTimeout])

    const [connecting, setConnecting] = React.useState(false)
    const connectTimeout = React.useRef<NodeJS.Timeout>()

    const [device, setDevice] = React.useState<string>()

    const [connected, setConnected] = React.useState(false)

    const getInfoInterval = React.useRef<NodeJS.Timeout>()

    const { actions: { setFromWebSocket, resetTracker }, setAutoTracking } = React.useContext(AppContext)

    const [openModal, setOpenModal] = React.useState(false)
    const [deviceList, setDeviceList] = React.useState<Array<string>>([])
    const handleOpenModal = React.useCallback((deviceList: Array<string>) => {
        setDeviceList(deviceList)
        setOpenModal(true)
    }, [])
    const handleCloseModal = React.useCallback(() => {
        setDeviceList([])
        setOpenModal(false)
    }, [])

    const sendMessage = React.useCallback((socket: WebSocket, message: any) => {
        console.log('send message', message)
        socket.send(JSON.stringify(message))
    }, [])

    const close = React.useCallback((socket?: WebSocket, errorMessage?: string) => {
        if (socket && socket.readyState !== WebSocket.CLOSED) {
            if (errorMessage) {
                error.current = errorMessage
            }
            socket.close()
        }
    }, [])

    const handleCancelDeviceSelection = React.useCallback(() => {
        close(ws)
        handleCloseModal()
    }, [handleCloseModal, ws, close])

    const convertAndUpdateItems = React.useCallback((data: Int8Array) => {
        if (data.length !== 394) {
            close(ws, 'Received invalid data\nClosing connection')
        } else {
            const updatedData = new ItemsFromWebSocket()
            DUNGEONS.forEach(dungeon => {
                const offsets = getAddressOffsets(dungeon)
                updatedData.setData(dungeon, {
                    map: getItemForDungeon(data[offsets.map], dungeon),
                    compass: getItemForDungeon(data[offsets.compass], dungeon),
                    bigKey: getItemForDungeon(data[offsets.bigKey], dungeon),
                    currentSmallKeys: data[offsets.currentSmallKeys],
                    smallKeys: data[offsets.smallKeys]
                })
                if (dungeon === 'HC') {
                    const sewersOffsets = getAddressOffsets('Sewers')
                    updatedData.setData(dungeon, {
                        currentSmallKeys: data[offsets.currentSmallKeys],
                        smallKeys: data[sewersOffsets.smallKeys] + data[offsets.smallKeys]
                    })
                }
            })
            setFromWebSocket(updatedData)
        }
    }, [ws, setFromWebSocket, close])

    React.useEffect(() => {
        if (device && ws && ws.readyState !== WebSocket.CLOSED) {
            displayMessage(`Attaching to device\n${device}`)
            sendMessage(ws, {
                Opcode: 'Attach',
                Space: 'SNES',
                Operands: [device]
            })
            setConnecting(false)
            setConnected(true)

            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
            }
            setAutoTracking('enabled')

            // range: f5f000 ~ f5f500
            getInfoInterval.current = setInterval(() => sendMessage(ws, {
                Opcode: 'GetAddress',
                Space: 'SNES',
                Operands: ['f5f364', '18A']
            }), 1000)

            ws.onmessage = message => {
                const result = message.data as Blob
                const fr = new FileReader()
                fr.onloadend = () => {
                    displayMessage(`Auto tracking enabled\nDevice: ${device}`)
                    const data = new Int8Array(fr.result as ArrayBuffer)
                    console.log('message received', data)
                    // If the data we use are all zeros, we ignore the chunk (we are not in game)
                    if (data.slice(0, 38).every(value => value === 0) && data.slice(380).every(value => value === 0)) {
                        return
                    }
                    convertAndUpdateItems(data)
                    
                }
                fr.readAsArrayBuffer(result)
            }
        }
    }, [device, ws, sendMessage, convertAndUpdateItems, resetTracker, setAutoTracking, displayMessage])

    const connect = React.useCallback(() => {
        const socket = new WebSocket('ws://localhost:23074')
        setConnecting(true)

        socket.onopen = () => {
            displayMessage('Connecting to SNI')

            sendMessage(socket, {
                Opcode: 'DeviceList',
                Space: 'SNES'
            })
            connectTimeout.current = setTimeout(() => {
                setConnecting(false)
                close(socket, 'Connection refused\nPlease ensure that SNI is running')
            }, 5000)
        }

        socket.onmessage = message => {
            try {
                console.log('message received', JSON.parse(message.data))
                const result = JSON.parse(message.data)['Results']
                displayMessage('Connection established')
                setWs(socket)
                if (connectTimeout.current) {
                    clearTimeout(connectTimeout.current)
                    connectTimeout.current = undefined
                }
                if (result.length > 0) {
                    handleOpenModal(result)
                } else {
                    close(socket, 'No device detected\nClosing connection')
                }
            } catch (e) {
                console.error(`error while parsing message from SNI. message payload: ${message.data}`, e)
                close(socket, 'Closing connection due to error')
            }
        }

        // websocket onerror event listener
        socket.onerror = err => {
            console.error(
                'Socket encountered error: ',
                err.returnValue,
                'Closing socket'
            )
            error.current = 'Connection refused\nPlease ensure that SNI is running'
            socket.close()
        }

        socket.onclose = () => {
            console.log('Closing connection')
            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
                getInfoInterval.current = undefined
            }
            displayMessage(error.current || 'Disconnected from SNI', true)
            error.current = ''
            setConnected(false)
            setConnecting(false)
            setWs(undefined)
            setDevice(undefined)
            setAutoTracking('disabled')
        }
    }, [sendMessage, close, setAutoTracking, displayMessage, error, handleOpenModal])

    return <Container>
        <Message>{message.split("\n").map((line, index) => {
            if (index !== 0) {
                return <React.Fragment key={index}><br />{line}</React.Fragment>
            }
            return line
        })}</Message>
        <Button
            tabIndex={-1}
            disabled={connecting}
            onClick={() => connected ? close(ws) : connect()}
        >
            {connected ? 'DISABLE' : 'ENABLE'}
        </Button>
        <AutoTrackingModal
            open={openModal}
            closeModal={handleCloseModal}
            handleCancel={handleCancelDeviceSelection}
            deviceList={deviceList}
            connect={(device: string) => {
                setDevice(device)
            }}
        />
    </Container>
}

export default AutoTrackingToggle