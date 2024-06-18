import React, { useCallback } from 'react'
import { styled } from 'styled-components'
import { AppContext, RequiredModalContext } from '../config/context'
import { RequiredItem } from '../config/types'
import check from '../img/check.svg'
import cross from '../img/cross.svg'
import ItemImage from './ItemImage'
import { Button } from '../styles/Button.styles'
import { Modal, ModalActions } from '../styles/Modal.styles'

const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-family: monospace;
    color: #fff;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Item = styled.button<{ selected: boolean }>`
    display: flex;
    width: 34px;
    height: 34px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-color: transparent;
    margin: 2px;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    background-color: ${props => props.selected ? 'rgba(111,249,221, 0.7)' : undefined}
`

type ItemProps = {
    item: RequiredItem,
    selected: boolean,
    onClick: (item: RequiredItem) => void
}

const ItemButton: React.FC<ItemProps> = ({ item, selected, onClick }) => {

    const handleClick = useCallback(() => onClick(item), [onClick, item])

    return <Item onClick={handleClick} selected={selected}>
        <ItemImage item={item} height={28} />
    </Item>

}

const NotesModal: React.FC = () => {

    const { dungeon, required, open, handleClose } = React.useContext(RequiredModalContext)
    const { actions } = React.useContext(AppContext)

    const [selectedItems, setSelectedItems] = React.useState<Array<RequiredItem>>([])

    React.useEffect(() => {
        setSelectedItems(required)
    }, [required])


    const toggleItemSelected = React.useCallback((selectedItem: RequiredItem) => {
        setSelectedItems(selectedItems => {
            if (selectedItems.includes(selectedItem)) {
                return selectedItems.filter(item => item !== selectedItem)
            }
            return [...selectedItems, selectedItem]
        })
    }, [setSelectedItems])

    const getButtonProps = useCallback((item: RequiredItem): ItemProps => ({
        item,
        onClick: toggleItemSelected,
        selected: selectedItems.includes(item)
    }), [toggleItemSelected, selectedItems])

    return <Modal isOpen={open}>
        {dungeon && <>
            <Content>
                <Row>
                    <ItemButton {...getButtonProps('sword')} />
                    <ItemButton {...getButtonProps('lantern')} />
                    <ItemButton {...getButtonProps('firerod')} />
                    <ItemButton {...getButtonProps('bombos')} />
                    <ItemButton {...getButtonProps('torch')} />
                </Row>
                <Row>
                    <ItemButton {...getButtonProps('bombs')} />
                    <ItemButton {...getButtonProps('bow')} />
                    <ItemButton {...getButtonProps('hookshot')} />
                    <ItemButton {...getButtonProps('hammer')} />
                    <ItemButton {...getButtonProps('somaria')} />
                </Row>
                <Row>
                    <ItemButton {...getButtonProps('glove')} />
                    <ItemButton {...getButtonProps('flippers')} />
                    <ItemButton {...getButtonProps('boots')} />
                    <ItemButton {...getButtonProps('bigKey')} />
                    <ItemButton {...getButtonProps('smallKey')} />
                </Row>
                <Row>
                    <ItemButton {...getButtonProps('blueSwitch')} />
                    <ItemButton {...getButtonProps('redSwitch')} />
                    <ItemButton {...getButtonProps('dam')} />
                    <ItemButton {...getButtonProps('attic')} />
                    <ItemButton {...getButtonProps('other')} />
                </Row>
            </Content>
            <ModalActions>
                <Button
                    tabIndex={-1}
                    onClick={() => setSelectedItems([])}
                >
                    CLEAR
                </Button>
                <Button
                    tabIndex={-1}
                    onClick={() => handleClose()}
                >
                    <img src={cross} alt="" width={16} />
                </Button>
                <Button
                    onClick={() => {
                        actions.setRequired(dungeon!, selectedItems)
                        handleClose()
                    }}
                >
                    <img src={check} alt="" width={16} />
                </Button>
            </ModalActions>
        </>}
    </Modal>
}

export default NotesModal