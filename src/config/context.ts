import React from 'react'
import { Dungeon, ReducerState } from './types'

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
    }
}

export const AppContext = React.createContext<AppContext>(null as any)