import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    root: {
        width: 24,
        fontSize: 16,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
    }
}, { name: 'Cell' })

type Props = {
    onLeftClick: () => void,
    onRightClick?: () => void,
}

const Cell: React.FC<Props> = ({ onLeftClick, onRightClick = () => { }, children }) => {
    const classes = useStyles()

    return <div
    className={classes.root}
        onClick={onLeftClick}
        onContextMenu={(event) => {
            event.preventDefault()
            onRightClick()
        }}
    >
        {children}
    </div>
}

export default Cell