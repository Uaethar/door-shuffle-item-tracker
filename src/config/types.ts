export const DUNGEONS = ['HC', 'EP', 'DP', 'TOH', 'AT', 'POD', 'SP', 'SW', 'TT', 'IP', 'MM', 'TR', 'GT'] as const
export type Dungeon = typeof DUNGEONS[number]

export const REQUIRED_ITEMS = [
    'lantern',
    'firerod',
    'bombos',
    'torch',
    'bow',
    'hookshot',
    'hammer',
    'somaria',
    'glove',
    'flippers', 
    'boots',
    'dam',
    'attic'
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
    value: 'plus' | 'minus'
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

type ResetAction = {
    type: 'reset'
}

export type ReducerAction = MapCompassAction | BigKeyAction | SmallKeyAction | ChestAction | EntranceAction | RequiredAction
