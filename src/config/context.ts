import React from 'react'
import { Dungeon, RequiredItem, ReducerState, ItemsFromWebSocket } from './types'

export type AutoTrackingMode = 'disabled' | 'enabled'

export type AppContext = {
    state: ReducerState,
    actions: {
        toggleMap: (dungeon: Dungeon) => void,
        toggleCompass: (dungeon: Dungeon) => void,
        toggleBigKeyFound: (dungeon: Dungeon) => void,
        toggleBigKeyUnaivalable: (dungeon: Dungeon) => void,
        addSmallKey: (dungeon: Dungeon, subItem: 'found' | 'total' | 'current') => void,
        removeSmallKey: (dungeon: Dungeon, subItem: 'found' | 'total' | 'current') => void,
        addChest: (dungeon: Dungeon, subItem: 'found' | 'total') => void,
        removeChest: (dungeon: Dungeon, subItem: 'found' | 'total') => void,
        addEntrance: (dungeon: Dungeon) => void,
        removeEntrance: (dungeon: Dungeon) => void,
        setRequired: (dungeon: Dungeon, required: Array<RequiredItem>) => void,
        setFromWebSocket: (data: ItemsFromWebSocket) => void,
        resetTracker: (resetSmallKeys: boolean) => void,
    },
    autoTracking: AutoTrackingMode,
    setAutoTracking: (autoTracking: AutoTrackingMode) => void
}

export const AppContext = React.createContext<AppContext>(null as any)

export type RequiredModalContext = {
    dungeon?: Dungeon,
    required: Array<RequiredItem>,
    open: boolean,
    handleOpen: (dungeon: Dungeon, required: Array<RequiredItem>) => void
    handleClose: VoidFunction
}

export const RequiredModalContext = React.createContext<RequiredModalContext>(null as any)
