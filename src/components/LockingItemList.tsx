import React from 'react'
import { createUseStyles } from 'react-jss'
import { LockingItem } from '../config/types'
import Item from './Item'


const useStyles = createUseStyles({
    root: {
        width: 96,
        fontSize: 12,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
    },
    item: {
        display: 'flex',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '10px',
        textAlign: 'center'
    }
}, { name: 'LockingItemList' })

type Props = {
    locking: Array<LockingItem>,
    openLockingModal: VoidFunction
}

const LockingItemList: React.FC<Props> = ({ locking, openLockingModal }) => {
    const classes = useStyles()

    return <div
        className={classes.root}
        onClick={() => openLockingModal()}
        onContextMenu={(event) => event.preventDefault()}
    >
        {locking.slice(0, 4).map(item =>
            <div className={classes.item}>
                <Item item={item} />
            </div>
        )}
    </div>
}

export default LockingItemList