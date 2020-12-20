import React from 'react'

type WebSocketContext = {
    connect: VoidFunction,
    close: VoidFunction,
    connected: boolean
}

const WebSocketContext = React.createContext<WebSocketContext>(null as any)

export const useWebSocket = () => React.useContext(WebSocketContext)

export const WebSocketContextProvider: React.FC = ({ children }) => {
    const [ws, setWs] = React.useState<WebSocket>()
    const [connected, setConnected] = React.useState(false)
    const getInfoInterval = React.useRef<NodeJS.Timeout>()
    const checkSram = React.useRef(false)
    const [device, setDevice] = React.useState<string>()
    const connectTimeout = React.useRef<NodeJS.Timeout>()

    const sendMessage = React.useCallback((socket: WebSocket, message: any) => {
        console.log('send message', message)
        socket.send(JSON.stringify(message))
    }, [])

    const close = React.useCallback((socket?: WebSocket) => {
        if (socket && socket.readyState !== WebSocket.CLOSED) {
            socket.close()
        }
    }, [])

    React.useEffect(() => {
        if (device && ws) {
            console.log(`Attach to device ${device}`)
            sendMessage(ws, {
                Opcode: 'Attach',
                Space: 'SNES',
                Operands: [device]
            })
            setConnected(true)

            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
            }
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
                    const data = new Int8Array(fr.result as ArrayBuffer)
                    console.log('message received', data)
                    // If all data are empty, we are probably in title screen or file select, so we check SRAM content instead
                    if (!checkSram.current && data.every(value => value === 0)) {
                        checkSram.current = true
                    } else {
                        checkSram.current = false
                        // TODO convert data and add it to context
                    }
                }
                fr.readAsArrayBuffer(result)
            }
        }
    }, [device, ws, sendMessage])

    const connect = React.useCallback(() => {
        const socket = new WebSocket('ws://localhost:8080')

        socket.onopen = () => {
            console.log('Connect to Qusb2snes');
            setWs(socket)

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
                if (connectTimeout.current) {
                    clearTimeout(connectTimeout.current)
                    connectTimeout.current = undefined
                }
                if (result.length > 0) {
                    // TODO add device selection menu
                    setDevice(result[0])
                } else {
                    console.log('No device detected. Close connection.')
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
            console.log('Close connection')
            if (getInfoInterval.current) {
                clearInterval(getInfoInterval.current)
                getInfoInterval.current = undefined
            }
            setConnected(false)
            setWs(undefined)
        }
    }, [sendMessage, close])


    return <WebSocketContext.Provider value={{
        connect,
        close: () => close(ws),
        connected
    }}>
        {children}
    </WebSocketContext.Provider>
}