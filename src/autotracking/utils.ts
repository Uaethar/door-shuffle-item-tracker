import { Dungeon, WebSocketItem } from "../config/types"

export const readBit = (value: number, position: number): boolean => {
    if (position < 0 || position >= 8) {
        throw 'position out of range'
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

export const getAddressOffsets = (dungeon: Dungeon): Record<WebSocketItem, number> => {
    switch (dungeon) {
        case 'HC':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 25
            }
        case 'EP':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 26
            }
        case 'DP':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 27
            }
        case 'AT':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 28
            }
        case 'SP':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 29
            }
        case 'POD':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 30
            }
        case 'MM':
            return {
                map: 5,
                compass: 1,
                bigKey: 3,
                smallKeys: 31
            }
        case 'SW':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 32
            }
        case 'IP':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 33
            }
        case 'TOH':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 34
            }
        case 'TT':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 35
            }
        case 'TR':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 36
            }
        case 'GT':
            return {
                map: 4,
                compass: 0,
                bigKey: 2,
                smallKeys: 37
            }
    }
}
