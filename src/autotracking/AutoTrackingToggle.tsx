import React from 'react'
import { createUseStyles } from 'react-jss'
import { AppContext } from '../config/context'
import { DUNGEONS, ItemsFromWebSocket } from '../config/types'
import AutoTrackingModal from './AutoTrackingModal'
import { getAddressOffsets, getItemForDungeon } from './utils'

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 3
    },
    message: {
        marginRight: 5,
        textAlign: 'right'
    },
    button: {
        height: 26,
        margin: 2,
        padding: 3,
        cursor: 'pointer',
        backgroundColor: '#606060',
        color: '#fff',
        outline: 'none',
        tabIndex: -1
    }
})

const AutoTrackingToggle: React.FC = () => {

    const classes = useStyles()

    const [ws, setWs] = React.useState<WebSocket>()
    const [message, setMessage] = React.useState("Auto tracking disabled")
    const error = React.useRef("")
    const resetMessageTimeout = React.useRef<NodeJS.Timeout>()
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
    const [trackSmallKeys, setTrackSmallKeys] = React.useState(true)

    const [connected, setConnected] = React.useState(false)

    const checkSram = React.useRef(false)
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

    const convertAndUpdateItems = React.useCallback((data: Int8Array, fromSram: boolean) => {
        if (data.length !== 38) {
            close(ws, 'Received invalid data\nClosing connection')
        } else {
            const updatedData = new ItemsFromWebSocket()
            DUNGEONS.forEach(dungeon => {
                const offsets = getAddressOffsets(dungeon)
                updatedData.setData(dungeon, {
                    map: getItemForDungeon(data[offsets.map], dungeon),
                    compass: getItemForDungeon(data[offsets.compass], dungeon),
                    bigKey: getItemForDungeon(data[offsets.bigKey], dungeon),
                    smallKeys: trackSmallKeys ? data[offsets.smallKeys] : undefined
                })
            })
            setFromWebSocket(updatedData, fromSram)
        }
    }, [ws, setFromWebSocket, close, trackSmallKeys])

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
            resetTracker(trackSmallKeys)
            setAutoTracking(trackSmallKeys ? 'enabledSmallKeys' : 'enabled')

            // WRAM range: f5f000 ~ f5f500 (live update, only in game)
            // SRAM range: e08000 ~ e08500 (updated when s&q, always accessible)
            getInfoInterval.current = setInterval(() => sendMessage(ws, {
                Opcode: 'GetAddress',
                Space: 'SNES',
                Operands: [checkSram.current ? 'e08364' : 'f5f364', '26']
            }), 1000)

            ws.onmessage = message => {
                const result = message.data as Blob
                const fr = new FileReader()
                fr.onloadend = () => {
                    displayMessage(`Auto tracking enabled\nDevice: ${device}`)
                    const data = new Int8Array(fr.result as ArrayBuffer)
                    console.log('message received', data)
                    // If all data are empty, we are probably in title screen or file select, so we check SRAM content instead
                    if (!checkSram.current && data.every(value => value === 0)) {
                        checkSram.current = true
                    } else {
                        // TODO convert data and add it to context
                        convertAndUpdateItems(data, checkSram.current)
                        checkSram.current = false
                    }
                }
                fr.readAsArrayBuffer(result)
            }
        }
    }, [device, ws, sendMessage, convertAndUpdateItems, resetTracker, setAutoTracking, displayMessage])

    const connect = React.useCallback(() => {
        const socket = new WebSocket('ws://localhost:8080')
        setConnecting(true)

        socket.onopen = () => {
            displayMessage('Connecting to Qusb2snes')

            sendMessage(socket, {
                Opcode: 'DeviceList',
                Space: 'SNES'
            })
            connectTimeout.current = setTimeout(() => {
                setConnecting(false)
                close(socket, 'Connection refused\nPlease ensure that Qusb2snes is running')
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
                console.error(`error while parsing message from Qusb2snes. message payload: ${message.data}`, e)
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
            error.current = 'Connection refused\nPlease ensure that Qusb2snes is running'
            socket.close()
        }

        socket.onclose = () => {
            console.log('Closing connection')
            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
                getInfoInterval.current = undefined
            }
            displayMessage(error.current || 'Disconnected from Qusb2snes', true)
            error.current = ''
            setConnected(false)
            setConnecting(false)
            setWs(undefined)
            setDevice(undefined)
            setAutoTracking('disabled')
        }
    }, [sendMessage, close, setAutoTracking, displayMessage, error, handleOpenModal])

    return <div className={classes.root}>
        <div className={classes.message}>{message.split("\n").map((line, index) => {
            if (index !== 0) {
                return <><br />{line}</>
            }
            return line
        })}</div>
        <button
            className={classes.button}
            disabled={connecting}
            onClick={() => connected ? close(ws) : connect()}
        >
            {connected ? 'DISABLE' : 'ENABLE'}
        </button>
        <AutoTrackingModal
            open={openModal}
            closeModal={handleCloseModal}
            handleCancel={handleCancelDeviceSelection}
            deviceList={deviceList}
            connect={(device: string, trackSmallKeys: boolean) => {
                setDevice(device)
                setTrackSmallKeys(trackSmallKeys)
            }}
        />
    </div>
}

export default AutoTrackingToggle