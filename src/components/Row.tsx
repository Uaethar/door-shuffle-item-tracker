import React from 'react'
import { AppContext, RequiredModalContext } from '../config/context'
import { Dungeon } from '../config/types'
import Cell from './Cell'
import check from '../img/check.svg'
import cross from '../img/cross.svg'
import RequiredItemList from './RequiredItemList'
import { styled } from 'styled-components'

const Container = styled.div<{ $stripped: boolean }>`
    display: flex;
    flex-direction: row;
    height: 24px;
    background-color: ${props => props.$stripped ? '#505050' : '#404040'};
    &:hover {
        background-color: '#606060'
    }
    &:not(:last-child) {
        border-bottom: 1px solid #fff
    }
`

const CellGroup = styled.div<{ $allFound?: boolean; $allUsed?: boolean }>`
    min-width: 24px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
        border-right: 1px solid #fff;
    }
    background-color: ${props => {
        if (props.$allFound) return 'rgba(0, 200, 0, 0.25)'
        if (props.$allUsed) return 'rgba(200, 0, 0, 0.25)'
        return undefined
    }}
`

type Props = {
    dungeon: Dungeon,
    stripped: boolean
}

const Row: React.FC<Props> = ({ dungeon, stripped }) => {

    const { state: { [dungeon]: { map, compass, bigKey, smallKeys, chests, entrances, required } }, actions, autoTracking } = React.useContext(AppContext)
    const { handleOpen } = React.useContext(RequiredModalContext)


    return <Container $stripped={stripped}>
        <CellGroup>
            {dungeon}
        </CellGroup>
        <CellGroup $allFound={entrances.found === entrances.max}>
            <Cell
                onLeftClick={() => {
                    if (entrances.found < entrances.max) {
                        actions.addEntrance(dungeon)
                    }
                }}
                onRightClick={() => actions.removeEntrance(dungeon)}
            >
                {entrances.found}
            </Cell>
        </CellGroup>
        <CellGroup>
            <Cell
                onLeftClick={() => autoTracking === 'disabled' && actions.toggleMap(dungeon)}
            >
                {map && <img src={check} alt="" width={16} />}
            </Cell>
        </CellGroup>
        <CellGroup>
            <Cell
                onLeftClick={() => autoTracking === 'disabled' && actions.toggleCompass(dungeon)}
            >
                {compass && <img src={check} alt="" width={16} />}
            </Cell>
        </CellGroup>
        <CellGroup>
            <Cell
                onLeftClick={() => autoTracking === 'disabled' && actions.toggleBigKeyFound(dungeon)}
                onRightClick={() => !(autoTracking !== 'disabled' && bigKey === 'found') && actions.toggleBigKeyUnaivalable(dungeon)}
            >
                {bigKey === 'found' && <img src={check} alt="" width={16} />}
                {bigKey === 'unavailable' && <img src={cross} alt="" width={16} />}
            </Cell>
        </CellGroup>
        <CellGroup
            $allFound={smallKeys.found === smallKeys.total}
            $allUsed={smallKeys.total != null && smallKeys.current === 0}
        >
            <Cell
                onLeftClick={() => {
                    if (smallKeys.total === null || smallKeys.found < smallKeys.total) {
                        actions.addSmallKey(dungeon, 'found')
                        actions.addSmallKey(dungeon, 'current')
                    }
                }}
                onRightClick={() => actions.removeSmallKey(dungeon, 'found')}
            >
                {smallKeys.found}
            </Cell>
            <Cell
                onLeftClick={() => actions.addSmallKey(dungeon, 'total')}
                onRightClick={() => actions.removeSmallKey(dungeon, 'total')}
            >
                {smallKeys.total !== null ? smallKeys.total : '?'}
            </Cell>
            <Cell
                onLeftClick={() => {
                    actions.addSmallKey(dungeon, 'current')
                }}
                onRightClick={() => actions.removeSmallKey(dungeon, 'current')}
            >
                {smallKeys.current}
            </Cell>
        </CellGroup>
        <CellGroup $allFound={chests.found === chests.total}>
            <Cell
                onLeftClick={() => {
                    if (chests.total === null || chests.found < chests.total) {
                        actions.addChest(dungeon, 'found')
                    }
                }}
                onRightClick={() => actions.removeChest(dungeon, 'found')}
            >
                {chests.found}
            </Cell>
            <Cell
                onLeftClick={() => actions.addChest(dungeon, 'total')}
                onRightClick={() => actions.removeChest(dungeon, 'total')}
            >
                {chests.total !== null ? chests.total : '?'}
            </Cell>
        </CellGroup>
        <CellGroup>
            <RequiredItemList required={required} openRequiredModal={() => handleOpen(dungeon, required)} />
        </CellGroup>
    </Container>
}

export default Row
