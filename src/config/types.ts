export const DUNGEONS = ['HC', 'EP', 'DP', 'TOH', 'AT', 'POD', 'SP', 'SW', 'TT', 'IP', 'MM', 'TR', 'GT'] as const
export type Dungeon = typeof DUNGEONS[number]

export const REQUIRED_ITEMS = [
    'other',
    'dam',
    'attic',
    'bigKey',
    'smallKey',
    'bombs',
    'somaria',
    'torch',
    'lantern',
    'firerod',
    'bombos',
    'sword',
    'bow',
    'hookshot',
    'hammer',
    'glove',
    'flippers',
    'boots',
    'redSwitch',
    'blueSwitch',
] as const
export type RequiredItem = typeof REQUIRED_ITEMS[number]

export const sortRequired = (a: RequiredItem, b: RequiredItem) => REQUIRED_ITEMS.indexOf(a) - REQUIRED_ITEMS.indexOf(b)

export type DungeonSubItems = {
    found: number,
    total: number | null,
    used: number
}

export type DungeonItems = {
    map: boolean,
    compass: boolean,
    bigKey: 'found' | 'notFound' | 'unavailable',
    smallKeys: DungeonSubItems,
    chests: DungeonSubItems,
    entrances: {
        found: number,
        max: number
    },
    required: Array<RequiredItem>
}

export type WebSocketItem = 'map' | 'compass' | 'bigKey' | 'smallKeys'

export type DungeonItemsFromWebSocket = {
    map: boolean,
    compass: boolean,
    bigKey: boolean,
    smallKeys?: number
}

export class ItemsFromWebSocket {
    data: Record<Dungeon, DungeonItemsFromWebSocket>

    constructor() {
        const emptyValues: DungeonItemsFromWebSocket = {
            map: false,
            compass: false,
            bigKey: false,
            smallKeys: 0
        }
        this.data =  {
            'HC': emptyValues,
            'EP': emptyValues,
            'DP': emptyValues,
            'TOH': emptyValues,
            'AT': emptyValues,
            'POD': emptyValues,
            'SP': emptyValues,
            'SW': emptyValues,
            'TT': emptyValues,
            'IP': emptyValues,
            'MM': emptyValues,
            'TR': emptyValues,
            'GT': emptyValues,
        }

    }

    setData(dungeon: Dungeon, data: Partial<DungeonItemsFromWebSocket>) {
        this.data[dungeon] = {
            ...this.data[dungeon],
            ...data
        }
    }
}

export type ReducerState = Record<Dungeon, DungeonItems>

type BaseAction = {
    dungeon: Dungeon
}

type MapCompassAction = BaseAction & {
    type: 'toggle',
    item: 'map' | 'compass'
}

type BigKeyAction = BaseAction & {
    type: 'bigKey',
    value: 'found' | 'unavailable'
}

type SmallKeyAction = BaseAction & {
    type: 'smallKey',
    subItem: 'found' | 'total' | 'used',
    value: 'plus' | 'minus',
    autoTracking: boolean
}

type ChestAction = BaseAction & {
    type: 'chest',
    subItem: 'found' | 'total',
    value: 'plus' | 'minus'
}

type EntranceAction = BaseAction & {
    type: 'entrance',
    value: 'plus' | 'minus'
}

type RequiredAction = BaseAction & {
    type: 'required',
    value: Array<RequiredItem>
}

type SetFromWebSocketAction = {
    type: 'fromWebSocket',
    data: ItemsFromWebSocket,
    fromSram: boolean
}

type ResetTrackerAction = {
    type: 'resetTracker',
    resetSmallKeys: boolean
}

export type ReducerAction = MapCompassAction | BigKeyAction | SmallKeyAction | ChestAction | EntranceAction | RequiredAction | SetFromWebSocketAction | ResetTrackerAction

