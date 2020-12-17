import React from 'react'
import { AppContext, RequiredModalContext } from '../config/context'
import { RequiredItem } from '../config/types'
import Modal from 'react-modal'
import { createUseStyles } from 'react-jss'
import Item from './Item'
import classNames from 'classnames'
import check from '../img/check.svg'
import cross from '../img/cross.svg'

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#fff'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    item: {
        display: 'flex',
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 3,
        cursor: 'pointer',
        textAlign: 'center'
    },
    selected: {
        backgroundColor: 'rgba(111,249,221, 0.7)'
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

type Props = {}

const RequiredItemModal: React.FC<Props> = () => {

    const classes = useStyles()

    const { dungeon, open, handleClose } = React.useContext(RequiredModalContext)
    const { state, actions } = React.useContext(AppContext)

    const [selectedItems, setSelectedItems] = React.useState<Array<RequiredItem>>([])

    React.useEffect(() => {
        if (typeof dungeon !== 'undefined') {
            setSelectedItems(state[dungeon].required)
        } else {
            setSelectedItems([])
        }
    }, [dungeon, state])


    const toggleItemSelected = React.useCallback((selectedItem: RequiredItem) => {
        if (selectedItems.includes(selectedItem)) {
            setSelectedItems(selectedItems => selectedItems.filter(item => item !== selectedItem))
        } else {
            setSelectedItems(selectedItems => [...selectedItems, selectedItem])
        }
    }, [setSelectedItems, selectedItems])

    const renderItem = React.useCallback((item: RequiredItem) => <div
        className={classNames(classes.item, { [classes.selected]: selectedItems.includes(item) })}
        onClick={() => toggleItemSelected(item)}
        onContextMenu={() => { }}
    >
        <Item item={item} height={28} />
    </div>, [selectedItems, classes, toggleItemSelected])

    return <Modal
        isOpen={open}
        className={classes.modal}
        overlayClassName={classes.overlay}
    >
        {dungeon && <>
            <div className={classes.root}>
                <div className={classes.row}>
                    {renderItem("sword")}
                    {renderItem("lantern")}
                    {renderItem("firerod")}
                    {renderItem("bombos")}
                    {renderItem("torch")}
                </div>
                <div className={classes.row}>
                    {renderItem("bombs")}
                    {renderItem("bow")}
                    {renderItem("hookshot")}
                    {renderItem("hammer")}
                    {renderItem("somaria")}
                </div>
                <div className={classes.row}>
                    {renderItem("glove")}
                    {renderItem("flippers")}
                    {renderItem("boots")}
                    {renderItem("bigKey")}
                    {renderItem("smallKey")}
                </div>
                <div className={classes.row}>
                    {renderItem("blueSwitch")}
                    {renderItem("redSwitch")}
                    {renderItem("dam")}
                    {renderItem("attic")}
                    {renderItem("other")}
                </div>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={() => setSelectedItems([])}
                >
                    CLEAR
                </button>
                <button
                    className={classes.button}
                    onClick={() => handleClose()}
                >
                    <img src={cross} alt="" width={16} />
                </button>
                <button
                    className={classes.button}
                    onClick={() => {
                        actions.setRequired(dungeon!, selectedItems)
                        handleClose()
                    }}
                >
                    <img src={check} alt="" width={16} />
                </button>
            </div>
        </>}
    </Modal>
}

export default RequiredItemModal