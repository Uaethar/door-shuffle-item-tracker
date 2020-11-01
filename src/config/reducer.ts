import { DungeonItems, DUNGEONS, ReducerState, ReducerAction } from "./types";

const defaultItems: DungeonItems = {
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
    }
}

export const init: ReducerState = DUNGEONS.reduce((acc, dungeon) => ({
    ...acc,
    [dungeon]: defaultItems
}), {}) as ReducerState

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
        case 'reset': {
            return init
        }
        default:
            return state
    }
}