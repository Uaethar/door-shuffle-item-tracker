import { Dispatch } from "react";
import { Dungeon, RequiredItem, ReducerAction, ItemsFromWebSocket } from "./types";

export const toggleMap = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon) => dispatch({
    type: 'toggle',
    dungeon,
    item: 'map'
})

export const toggleCompass = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon) => dispatch({
    type: 'toggle',
    dungeon,
    item: 'compass'
})

export const toggleBigKeyFound = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon) => dispatch({
    type: 'bigKey',
    dungeon,
    value: 'found'
})

export const toggleBigKeyUnaivalable = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon) => dispatch({
    type: 'bigKey',
    dungeon,
    value: 'unavailable'
})

export const addSmallKey = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon, subItem: 'found' | 'total' | 'used', autoTracking: boolean) => dispatch({
    type: 'smallKey',
    dungeon,
    subItem,
    value: 'plus',
    autoTracking
})

export const removeSmallKey = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon, subItem: 'found' | 'total' | 'used', autoTracking: boolean) => dispatch({
    type: 'smallKey',
    dungeon,
    subItem,
    value: 'minus',
    autoTracking
})

export const addChest = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon, subItem: 'found' | 'total') => dispatch({
    type: 'chest',
    dungeon,
    subItem,
    value: 'plus'
})

export const removeChest = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon, subItem: 'found' | 'total') => dispatch({
    type: 'chest',
    dungeon,
    subItem,
    value: 'minus'
})

export const addEntrance = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon) => dispatch({
    type: 'entrance',
    dungeon,
    value: 'plus'
})
export const removeEntrance = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon) => dispatch({
    type: 'entrance',
    dungeon,
    value: 'minus'
})

export const setRequired = (dispatch: Dispatch<ReducerAction>) => (dungeon: Dungeon, required: Array<RequiredItem>) => dispatch({
    type: 'required',
    dungeon,
    value: required
})

export const setFromWebSocket = (dispatch: Dispatch<ReducerAction>) => (data: ItemsFromWebSocket, fromSram: boolean) => dispatch({
    type: 'fromWebSocket',
    data,
    fromSram
})

export const resetTracker = (dispatch: Dispatch<ReducerAction>) => (resetSmallKeys: boolean) => dispatch({
    type: 'resetTracker',
    resetSmallKeys
})