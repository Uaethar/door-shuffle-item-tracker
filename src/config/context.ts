import React from 'react'
import { Dungeon, RequiredItem, ReducerState } from './types'

export type AppContext = {
    state: ReducerState,
    actions: {
        toggleMap: (dungeon: Dungeon) => void,
        toggleCompass: (dungeon: Dungeon) => void,
        toggleBigKeyFound: (dungeon: Dungeon) => void,
        toggleBigKeyUnaivalable: (dungeon: Dungeon) => void,
        addSmallKey: (dungeon: Dungeon, subItem: 'found' | 'total' | 'used') => void,
        removeSmallKey: (dungeon: Dungeon, subItem: 'found' | 'total' | 'used') => void,
        addChest: (dungeon: Dungeon, subItem: 'found' | 'total') => void,
        removeChest: (dungeon: Dungeon, subItem: 'found' | 'total') => void,
        addEntrance: (dungeon: Dungeon) => void,
        removeEntrance: (dungeon: Dungeon) => void,
        setRequired: (dungeon: Dungeon, required: Array<RequiredItem>) => void
    }
}

export const AppContext = React.createContext<AppContext>(null as any)

export type RequiredModalContext = {
    dungeon?: Dungeon,
    open: boolean,
    handleOpen: (dungeon: Dungeon) => void
    handleClose: VoidFunction
}

export const RequiredModalContext = React.createContext<RequiredModalContext>(null as any)
