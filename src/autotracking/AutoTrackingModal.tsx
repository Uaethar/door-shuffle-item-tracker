import React from 'react'
import Modal from 'react-modal'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#fff'
    },
    modal: {
        position: 'absolute',
        top: 86,
        left: 66,
        width: 200,
        backgroundColor: '#404040',
        border: '1px solid #606060',
        outline: 'none',
        borderRadius: 5,
        padding: 5
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(35,35,35,0.75)'
    },
    title: {
        marginBottom: 5
    },
    listElement: {
        width: '100%'
    },
    selected: {
        borderColor: 'rgba(111,249,221, 0.7)'
    },
    smallKeys: {
        margin: 5,
        display: 'flex',
        alignItems: 'center'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    button: {
        height: 26,
        margin: 2,
        padding: 3,
        cursor: 'pointer',
        backgroundColor: '#606060',
        color: '#fff',
        outline: 'none',
        tabIndex: -1
    }
}, { name: 'RequiredItemModal' })

type Props = {
    open: boolean,
    deviceList: Array<string>,
    handleCancel: VoidFunction,
    closeModal: VoidFunction,
    connect: (device: string, trackSmallKeys: boolean) => void
}

const AutoTrackingModal: React.FC<Props> = ({ open, handleCancel, closeModal, connect, deviceList }) => {

    const classes = useStyles()
    const [device, setDevice] = React.useState<number>()
    const [trackSmallKeys, setTrackSmallKeys] = React.useState(true)

    const handleConnect = React.useCallback(() => {
        console.log('here', device)
        if (typeof device != 'undefined') {
            connect(deviceList[device], trackSmallKeys)
            closeModal()
        }
    }, [deviceList, device, closeModal, trackSmallKeys, connect])

    return <Modal
        isOpen={open}
        className={classes.modal}
        overlayClassName={classes.overlay}
        ariaHideApp={false}
        onAfterClose={() => {
            setDevice(undefined)
            setTrackSmallKeys(true)
        }}
    >
        <div className={classes.root}>
            <div className={classes.title}>Select device:</div>
            {deviceList.map((name, index) => <button key={index} className={classNames(classes.button, { [classes.selected]: device === index })} onClick={() => setDevice(index)}>{name}</button>)}
            {/* <div className={classes.smallKeys}>
                <label htmlFor="trackSmallKeys">Track smallKeys</label>
                <input
                    type="checkbox"
                    id="trackSmallKeys"
                    name="trackSmallKeys"
                    checked={trackSmallKeys}
                    onChange={(event) => setTrackSmallKeys(event.target.checked)}
                />
            </div> */}
            <div className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={() => handleCancel()}
                >
                    CANCEL
                </button>
                <button
                    className={classes.button}
                    disabled={typeof device === 'undefined'}
                    onClick={() => handleConnect()}
                >
                    CONNECT
                </button>
            </div>
        </div>

    </Modal>
}

export default AutoTrackingModal