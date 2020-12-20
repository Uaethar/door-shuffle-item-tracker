import React from 'react'
import { useWebSocket } from './context'

const AutoTrackingToggle: React.FC = () => {
    const { connect, close, connected } = useWebSocket()

    return <button
        onClick={() => connected ? close() : connect()}
    >
        {connected ? 'DISABLE AUTO TRACKING' : 'ENABLE AUTO TRACKING'}
    </button>
}

export default AutoTrackingToggle