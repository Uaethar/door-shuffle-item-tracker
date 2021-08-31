import { Dungeon, WebSocketItem } from "../config/types"

export const readBit = (value: number, position: number): boolean => {
    if (position < 0 || position >= 8) {
        throw new Error('position out of range')
    }
    return (value & (1 << position)) !== 0
}

export const getItemForDungeon = (value: number, dungeon: Dungeon): boolean => {
    switch (dungeon) {
        case 'MM':
            return readBit(value, 0)
        case 'POD':
            return readBit(value, 1)
        case 'GT':
        case 'SP':
            return readBit(value, 2)
        case 'TR':
        case 'AT':
            return readBit(value, 3)
        case 'TT':
        case 'DP':
            return readBit(value, 4)
        case 'TOH':
        case 'EP':
            return readBit(value, 5)
        case 'IP':
        case 'HC':
            return readBit(value, 6)
        case 'SW':
            return readBit(value, 7)
    }
}

export const getAddressOffsets = (dungeon: Dungeon | 'Sewers'): Record<WebSocketItem, number> => {
    switch (dungeon) {
        case 'HC':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 380,
                currentSmallKeys: 25
            }
        case 'Sewers':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 381,
                currentSmallKeys: 26
            }
        case 'EP':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 382,
                currentSmallKeys: 26
            }
        case 'DP':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 383,
                currentSmallKeys: 27
            }
        case 'AT':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 384,
                currentSmallKeys: 28
            }
        case 'SP':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 385,
                currentSmallKeys: 29
            }
        case 'POD':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 386,
                currentSmallKeys: 30
            }
        case 'MM':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 387,
                currentSmallKeys: 31
            }
        case 'SW':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 388,
                currentSmallKeys: 32
            }
        case 'IP':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 389,
                currentSmallKeys: 33
            }
        case 'TOH':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 390,
                currentSmallKeys: 34
            }
        case 'TT':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 391,
                currentSmallKeys: 35
            }
        case 'TR':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 392,
                currentSmallKeys: 36
            }
        case 'GT':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 393,
                currentSmallKeys: 37
            }
    }
}
