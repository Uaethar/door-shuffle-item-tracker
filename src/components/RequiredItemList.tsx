import React from 'react'
import { createUseStyles } from 'react-jss'
import { RequiredItem } from '../config/types'
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
}, { name: 'RequiredItemList' })

type Props = {
    required: Array<RequiredItem>,
    openRequiredModal: VoidFunction
}

const RequiredItemList: React.FC<Props> = ({ required, openRequiredModal }) => {
    const classes = useStyles()

    return <div
        className={classes.root}
        onClick={() => openRequiredModal()}
        onContextMenu={(event) => event.preventDefault()}
    >
        {required.slice(0, 4).map(item =>
            <div className={classes.item}>
                <Item item={item} />
            </div>
        )}
    </div>
}

export default RequiredItemList