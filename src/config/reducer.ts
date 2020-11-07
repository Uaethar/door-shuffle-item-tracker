import { DungeonItems, ReducerState, ReducerAction, sortRequired } from "./types";

const defaultItems: Omit<DungeonItems, 'entrances'> = {
    map: false,
    compass: false,
    bigKey: 'notFound',
    smallKeys: {
        found: 0,
        total: null,
        used: 0
    },
    chests: {
        found: 0,
        total: null,
        used: 0
    },
    required: []
}

export const init: ReducerState = {
    'HC': { ...defaultItems, entrances: { found: 0, max: 4 } },
    'EP': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'DP': { ...defaultItems, entrances: { found: 0, max: 4 } },
    'TOH': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'AT': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'POD': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'SP': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'SW': { ...defaultItems, entrances: { found: 0, max: 4 } },
    'TT': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'IP': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'MM': { ...defaultItems, entrances: { found: 0, max: 1 } },
    'TR': { ...defaultItems, entrances: { found: 0, max: 4 } },
    'GT': { ...defaultItems, entrances: { found: 0, max: 1 } },
}

const computeNewValue = (action: 'plus' | 'minus', value: number) => {
    if (action === 'plus') return value + 1
    if (action === 'minus' && value > 0) return value - 1
    return value
}

const computeNewNullableValue = (action: 'plus' | 'minus', value: number | null, minValue: number = 0) => {
    if (action === 'plus') {
        if (value === null) return minValue
        else return value + 1
    }
    if (action === 'minus' && value !== null) {
        if (value === minValue) return null
        else return value - 1
    }
    return value
}

export default (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
        case 'toggle': {
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    [action.item]: !state[action.dungeon][action.item]
                }
            }
        }
        case 'bigKey': {
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    bigKey: action.value === state[action.dungeon].bigKey ? 'notFound' : action.value
                }
            }
        }
        case 'smallKey': {
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    smallKeys: {
                        ...state[action.dungeon].smallKeys,
                        [action.subItem]: action.subItem === 'total' ?
                            computeNewNullableValue(action.value, state[action.dungeon].smallKeys[action.subItem], state[action.dungeon].smallKeys.found) :
                            computeNewValue(action.value, state[action.dungeon].smallKeys[action.subItem])
                    }
                }
            }
        }
        case 'chest': {
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    chests: {
                        ...state[action.dungeon].chests,
                        [action.subItem]: action.subItem === 'total' ?
                            computeNewNullableValue(action.value, state[action.dungeon].chests[action.subItem], state[action.dungeon].chests.found) :
                            computeNewValue(action.value, state[action.dungeon].chests[action.subItem])
                    }
                }
            }
        }
        case 'entrance': {
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    entrances: {
                        ...state[action.dungeon].entrances,
                        found: computeNewValue(action.value, state[action.dungeon].entrances.found)
                    }
                }
            }
        }
        case 'required': {
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    required: action.value.sort(sortRequired)
                }
            }
        }
        default:
            return state
    }
}