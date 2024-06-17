import { DungeonItems, ReducerState, ReducerAction, sortRequired, DungeonItemsFromWebSocket, DUNGEONS, Dungeon } from "./types";

const defaultItems: Omit<DungeonItems, 'entrances'> = {
    map: false,
    compass: false,
    bigKey: 'notFound',
    smallKeys: {
        found: 0,
        total: null,
        current: 0
    },
    chests: {
        found: 0,
        total: null,
        current: 0
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
    'GT': { ...defaultItems, entrances: { found: 0, max: 1 } }
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

const mergeDungeon = (dataFromState: DungeonItems, dataFromWebSocket: DungeonItemsFromWebSocket, dungeon: Dungeon): DungeonItems => {
    return ({
        ...dataFromState,
        map: dataFromWebSocket.map,
        compass: dataFromWebSocket.compass,
        bigKey: dataFromWebSocket.bigKey ? 'found' : dataFromState.bigKey,
        smallKeys: {
            ...dataFromState.smallKeys,
            found: dataFromWebSocket.smallKeys,
            current: dataFromWebSocket.currentSmallKeys
        },
    });
}

const reducer = (state: ReducerState, action: ReducerAction) => {
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
            const smallKeys = { ...state[action.dungeon].smallKeys }
            if (action.subItem === 'total') {
                smallKeys.total = computeNewNullableValue(action.value, state[action.dungeon].smallKeys[action.subItem], state[action.dungeon].smallKeys.found)  
            } else {
                smallKeys[action.subItem] = computeNewValue(action.value, smallKeys[action.subItem])
            }
            return {
                ...state,
                [action.dungeon]: {
                    ...state[action.dungeon],
                    smallKeys
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
        case 'resetTracker': {
            return DUNGEONS.reduce((acc, dungeon) => ({
                ...acc,
                [dungeon]: {
                    ...defaultItems,
                    entrances: state[dungeon].entrances,
                    smallKeys: action.resetSmallKeys ? {
                        ...defaultItems.smallKeys,
                        total: state[dungeon].smallKeys.total
                    } : state[dungeon].smallKeys,
                    chests: state[dungeon].chests,
                    required: state[dungeon].required
                }
            }), {} as ReducerState)
        }
        case 'fromWebSocket': {
            return DUNGEONS.reduce((acc, dungeon) => {
                return ({
                    ...acc,
                    [dungeon]: mergeDungeon(state[dungeon], action.data.data[dungeon], dungeon)
                });
            }, {} as ReducerState)
        }
        default:
            return state
    }
}

export default reducer