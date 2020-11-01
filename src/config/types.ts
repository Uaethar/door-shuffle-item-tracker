export const DUNGEONS = ['HC', 'EP', 'DP', 'TOH', 'AT', 'POD', 'SP', 'SW', 'TT', 'IP', 'MM', 'TR', 'GT'] as const
export type Dungeon = typeof DUNGEONS[number]

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
    chests: DungeonSubItems
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

type ResetAction = {
    type: 'reset'
}

export type ReducerAction = MapCompassAction | BigKeyAction | SmallKeyAction | ChestAction | ResetAction
