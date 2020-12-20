import React from 'react'
import { createUseStyles } from 'react-jss'
import { RequiredItem } from '../config/types'
import Item from './Item'
import classNames from 'classnames'

const useStyles = createUseStyles({
    root: {
        width: 96,
        fontSize: 12,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
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
    },
    etc: {
        marginTop: -3
    }
}, { name: 'RequiredItemList' })

type Props = {
    required: Array<RequiredItem>,
    openRequiredModal: VoidFunction
}

const RequiredItemList: React.FC<Props> = ({ required, openRequiredModal }) => {
    const classes = useStyles()

    const requiredCount = React.useMemo(() => required.length, [required])

    return <div
        className={classes.root}
        onClick={() => openRequiredModal()}
        onContextMenu={(event) => event.preventDefault()}
    >
        {(requiredCount <= 4 ? required : required.slice(0, 3)).map((item, index) =>
            <div className={classes.item} key={index}>
                <Item item={item} />
            </div>
        )}
        {requiredCount > 4 && <div className={classNames(classes.item, classes.etc)}>
            ...
        </div>}
    </div>
}

export default RequiredItemList