import React from 'react'
import { createUseStyles } from 'react-jss'
import { AppContext } from '../config/context'
import { Dungeon } from '../config/types'
import Cell from './Cell'
import check from '../img/check.png'
import cross from '../img/cross.png'
import classNames from 'classnames'

const useStyles = createUseStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
        height: 24,
        borderBottom: '1px solid #000',
        '&:hover': {
            backgroundColor: '#DDD'
        }
    },
    cell: {
        minWidth: 24,
        borderRight: '1px solid #000',
        alignText: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cellAllUsed: {
        backgroundColor: '#FCC'
    },
    cellAllFound: {
        backgroundColor: '#CFC'
    }
}, { name: 'Row' })

type Props = {
    dungeon: Dungeon
}

const Row: React.FC<Props> = ({ dungeon }) => {
    const { state: { [dungeon]: { map, compass, bigKey, smallKeys, chests } }, actions } = React.useContext(AppContext)
    const classes = useStyles()

    return <div className={classes.row}>
        <div className={classes.cell}>
            {dungeon}
        </div>
        <div className={classes.cell}>
            <Cell
                onLeftClick={() => actions.toggleMap(dungeon)}
            >
                {map && <img src={check} alt="" width={16} />}
            </Cell>
        </div>
        <div className={classes.cell}>
            <Cell
                onLeftClick={() => actions.toggleCompass(dungeon)}
            >
                {compass && <img src={check} alt="" width={16} />}
            </Cell>
        </div>
        <div className={classes.cell}>
            <Cell
                onLeftClick={() => actions.toggleBigKeyFound(dungeon)}
                onRightClick={() => actions.toggleBigKeyUnaivalable(dungeon)}
            >
                {bigKey === 'found' && <img src={check} alt="" width={16} />}
                {bigKey === 'unavailable' && <img src={cross} alt="" width={16} />}
            </Cell>
        </div>
        <div className={classNames(classes.cell, {
            [classes.cellAllFound]: smallKeys.found === smallKeys.total,
            [classes.cellAllUsed]: smallKeys.used !== 0 && smallKeys.found === smallKeys.used
        })}>
            <Cell
                onLeftClick={() => {
                    if (smallKeys.total === null || smallKeys.found < smallKeys.total) {
                        actions.addSmallKey(dungeon, 'found')
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
                    if (smallKeys.used < smallKeys.found) {
                        actions.addSmallKey(dungeon, 'used')
                    }
                }
                }
                onRightClick={() => actions.removeSmallKey(dungeon, 'used')}
            >
                {smallKeys.used}
            </Cell>
        </div>
        <div className={classNames(classes.cell, { [classes.cellAllFound]: chests.found === chests.total })}>
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
        </div>
    </div>
}

export default Row
