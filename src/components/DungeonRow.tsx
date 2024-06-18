import React from 'react'
import { styled } from 'styled-components'
import { AppContext, RequiredModalContext } from '../config/context'
import { Dungeon } from '../config/types'
import check from '../img/check.svg'
import cross from '../img/cross.svg'
import CellContent from './CellContent'
import Notes from './Notes'
import { TableCell as BaseCell, TableRow } from '../styles/Table.styles'

const DungeonCell = styled(BaseCell)`
    font-size: 12px;
`

const TableCell = styled(BaseCell) <{ $allFound?: boolean; $allUsed?: boolean }>`
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

const DungeonRow: React.FC<Props> = ({ dungeon }) => {

    const { state: { [dungeon]: { map, compass, bigKey, smallKeys, chests, entrances, required } }, actions, autoTracking } = React.useContext(AppContext)
    const { handleOpen } = React.useContext(RequiredModalContext)


    return <TableRow>
        <DungeonCell $bt $br $bb>
            {dungeon}
        </DungeonCell>
        <TableCell $bt $bl $br $bb $allFound={entrances.found === entrances.max}>
            <CellContent
                onLeftClick={() => {
                    if (entrances.found < entrances.max) {
                        actions.addEntrance(dungeon)
                    }
                }}
                onRightClick={() => actions.removeEntrance(dungeon)}
            >
                {entrances.found}
            </CellContent>
        </TableCell>
        <TableCell $bt $bl $br $bb>
            <CellContent
                onLeftClick={() => autoTracking === 'disabled' && actions.toggleMap(dungeon)}
            >
                {map && <img src={check} alt="" width={16} />}
            </CellContent>
        </TableCell>
        <TableCell $bt $bl $br $bb>
            <CellContent
                onLeftClick={() => autoTracking === 'disabled' && actions.toggleCompass(dungeon)}
            >
                {compass && <img src={check} alt="" width={16} />}
            </CellContent>
        </TableCell>
        <TableCell $bt $bl $br $bb>
            <CellContent
                onLeftClick={() => autoTracking === 'disabled' && actions.toggleBigKeyFound(dungeon)}
                onRightClick={() => !(autoTracking !== 'disabled' && bigKey === 'found') && actions.toggleBigKeyUnaivalable(dungeon)}
            >
                {bigKey === 'found' && <img src={check} alt="" width={16} />}
                {bigKey === 'unavailable' && <img src={cross} alt="" width={16} />}
            </CellContent>
        </TableCell>
        <TableCell
            $allFound={smallKeys.found === smallKeys.total}
            $allUsed={smallKeys.total != null && smallKeys.current === 0}
            $bt $bl $bb
        >
            <CellContent
                onLeftClick={() => {
                    if (smallKeys.total === null || smallKeys.found < smallKeys.total) {
                        actions.addSmallKey(dungeon, 'found')
                        actions.addSmallKey(dungeon, 'current')
                    }
                }}
                onRightClick={() => actions.removeSmallKey(dungeon, 'found')}
            >
                {smallKeys.found}
            </CellContent>
        </TableCell>
        <TableCell
            $allFound={smallKeys.found === smallKeys.total}
            $allUsed={smallKeys.total != null && smallKeys.current === 0}
            $bt $bb
        >
            <CellContent
                onLeftClick={() => actions.addSmallKey(dungeon, 'total')}
                onRightClick={() => actions.removeSmallKey(dungeon, 'total')}
            >
                {smallKeys.total !== null ? smallKeys.total : '?'}
            </CellContent>
        </TableCell>
        <TableCell
            $allFound={smallKeys.found === smallKeys.total}
            $allUsed={smallKeys.total != null && smallKeys.current === 0}
            $bt $br $bb
        >
            <CellContent
                onLeftClick={() => {
                    actions.addSmallKey(dungeon, 'current')
                }}
                onRightClick={() => actions.removeSmallKey(dungeon, 'current')}
            >
                {smallKeys.current}
            </CellContent>
        </TableCell>
        <TableCell $allFound={chests.found === chests.total} $bt $bl $bb>
            <CellContent
                onLeftClick={() => {
                    if (chests.total === null || chests.found < chests.total) {
                        actions.addChest(dungeon, 'found')
                    }
                }}
                onRightClick={() => actions.removeChest(dungeon, 'found')}
            >
                {chests.found}
            </CellContent>
        </TableCell>
        <TableCell $allFound={chests.found === chests.total} $bt $br $bb>
            <CellContent
                onLeftClick={() => actions.addChest(dungeon, 'total')}
                onRightClick={() => actions.removeChest(dungeon, 'total')}
            >
                {chests.total !== null ? chests.total : '?'}
            </CellContent>
        </TableCell>
        <TableCell colspan={4} $bt $bl $bb>
            <Notes notes={required} openNotesModal={() => handleOpen(dungeon, required)} />
        </TableCell>
    </TableRow>
}

export default DungeonRow
