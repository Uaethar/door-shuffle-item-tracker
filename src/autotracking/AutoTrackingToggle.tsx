import React from 'react'
import { AppContext } from '../config/context'
import { DUNGEONS, ItemsFromWebSocket } from '../config/types'
import { getAddressOffsets, getItemForDungeon } from './utils'

const AutoTrackingToggle: React.FC = () => {
    const [ws, setWs] = React.useState<WebSocket>()
    const [connected, setConnected] = React.useState(false)
    const getInfoInterval = React.useRef<NodeJS.Timeout>()
    const checkSram = React.useRef(false)
    const [device, setDevice] = React.useState<string>()
    const connectTimeout = React.useRef<NodeJS.Timeout>()

    const { actions: { setFromWebSocket, resetTracker }, setAutoTracking } = React.useContext(AppContext)

    const sendMessage = React.useCallback((socket: WebSocket, message: any) => {
        console.log('send message', message)
        socket.send(JSON.stringify(message))
    }, [])

    const close = React.useCallback((socket?: WebSocket) => {
        if (socket && socket.readyState !== WebSocket.CLOSED) {
            socket.close()
        }
    }, [])

    const convertAndUpdateItems = React.useCallback((data: Int8Array, fromSram: boolean) => {
        if (data.length !== 38) {
            console.error('Invalid data. Closing connection.')
            close(ws)
        } else {
            const updatedData = new ItemsFromWebSocket()
            DUNGEONS.forEach(dungeon => {
                const offsets = getAddressOffsets(dungeon)
                updatedData.setData(dungeon, {
                    map: getItemForDungeon(data[offsets.map], dungeon),
                    compass: getItemForDungeon(data[offsets.compass], dungeon),
                    bigKey: getItemForDungeon(data[offsets.bigKey], dungeon),
                    smallKeys: data[offsets.smallKeys]
                })
            })
            setFromWebSocket(updatedData, fromSram)
        }
    }, [ws, setFromWebSocket, close])

    React.useEffect(() => {
        if (device && ws && ws.readyState !== WebSocket.CLOSED) {
            console.log(`Attaching to device ${device}`)
            sendMessage(ws, {
                Opcode: 'Attach',
                Space: 'SNES',
                Operands: [device]
            })
            setConnected(true)

            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
            }
            resetTracker()
            setAutoTracking(true)
    
            // WRAM range: f5f000 ~ f5f500 (live update, only in game)
            // SRAM range: e08000 ~ e08500 (updated when s&q, always accessible)
            getInfoInterval.current = setInterval(() => sendMessage(ws, {
                Opcode: 'GetAddress',
                Space: 'SNES',
                Operands: [checkSram.current ? 'e08364' : 'f5f364', '26']
            }), 1000)

            ws.onmessage = message => {
                console.log(message.data)
                const result = message.data as Blob
                const fr = new FileReader()
                fr.onloadend = () => {
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
    }, [device, ws, sendMessage, convertAndUpdateItems, resetTracker, setAutoTracking])

    const connect = React.useCallback(() => {
        const socket = new WebSocket('ws://localhost:8080')

        socket.onopen = () => {
            console.log('Connecting to Qusb2snes');

            sendMessage(socket, {
                Opcode: 'DeviceList',
                Space: 'SNES'
            })
            connectTimeout.current = setTimeout(() => {
                console.log('Connection refused. Please ensure that Qusb2snes is running.')
            }, 5000)
        }

        socket.onmessage = message => {
            try {
                console.log('message received', JSON.parse(message.data))
                const result = JSON.parse(message.data)['Results']
                console.log('Connection established.')
                setWs(socket)
                if (connectTimeout.current) {
                    clearTimeout(connectTimeout.current)
                    connectTimeout.current = undefined
                }
                if (result.length > 0) {
                    // TODO add device selection menu
                    setDevice(result[0])
                } else {
                    console.log('No device detected. Closing connection.')
                    close(socket)
                }
            } catch (e) {
                console.error(`error while parsing message from Qusb2snes. message payload: ${message.data}`, e)
                close(socket)
            }
        }

        // websocket onerror event listener
        socket.onerror = err => {
            console.error(
                'Socket encountered error: ',
                err.returnValue,
                'Closing socket'
            );
            socket.close()
        }

        socket.onclose = () => {
            console.log('Closing connection')
            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
                getInfoInterval.current = undefined
            }
            setConnected(false)
            setWs(undefined)
            setDevice(undefined)
            setAutoTracking(false)
        }
    }, [sendMessage, close, setAutoTracking])

    return <button
        onClick={() => connected ? close(ws) : connect()}
    >
        {connected ? 'DISABLE AUTO TRACKING' : 'ENABLE AUTO TRACKING'}
    </button>
}

export default AutoTrackingToggle