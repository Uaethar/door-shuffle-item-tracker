import React, { useCallback } from 'react'
import { AppContext, RequiredModalContext } from '../config/context'
import { RequiredItem } from '../config/types'
import ItemImage from './ItemImage'
import check from '../img/check.svg'
import cross from '../img/cross.svg'
import Modal from 'styled-react-modal'
import { styled } from 'styled-components'

const StyledModal = Modal.styled`
    position: absolute;
    top: 86px;
    left: 66px;
    width: 200px; 
    background-color: #404040;
    border: 1px solid #606060;
    outline: none;
    border-radius: 5px;
    padding: 5px;
`

const Container = styled.div`
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

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
`

const Button = styled.button`
    height: 26px;
    margin: 2px;
    padding: 3px;
    cursor: pointer;
    background-color: #606060;
    color: #fff;
    outline: none;
`

const Item = styled.button<{selected: boolean}>`
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

type RequiredItemProps = {
    item: RequiredItem,
    selected: boolean,
    onClick: (item: RequiredItem) => void
}

const RequiredItemButton: React.FC<RequiredItemProps> = ({ item, selected, onClick }) => {

    const handleClick = useCallback(() => onClick(item), [onClick, item])

    return <Item onClick={handleClick} selected={selected}>
        <ItemImage item={item} height={28} />
    </Item>

}

const RequiredItemModal: React.FC = () => {

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

    const getButtonProps = useCallback((item: RequiredItem): RequiredItemProps => ({
        item,
        onClick: toggleItemSelected,
        selected: selectedItems.includes(item)
    }), [toggleItemSelected, selectedItems])

    return <StyledModal
        isOpen={open}
        ariaHideApp={false}
    >
        {dungeon && <>
            <Container>
                <Row>
                    <RequiredItemButton {...getButtonProps('sword')} />
                    <RequiredItemButton {...getButtonProps('lantern')} />
                    <RequiredItemButton {...getButtonProps('firerod')} />
                    <RequiredItemButton {...getButtonProps('bombos')} />
                    <RequiredItemButton {...getButtonProps('torch')} />
                </Row>
                <Row>
                    <RequiredItemButton {...getButtonProps('bombs')} />
                    <RequiredItemButton {...getButtonProps('bow')} />
                    <RequiredItemButton {...getButtonProps('hookshot')} />
                    <RequiredItemButton {...getButtonProps('hammer')} />
                    <RequiredItemButton {...getButtonProps('somaria')} />
                </Row>
                <Row>
                    <RequiredItemButton {...getButtonProps('glove')} />
                    <RequiredItemButton {...getButtonProps('flippers')} />
                    <RequiredItemButton {...getButtonProps('boots')} />
                    <RequiredItemButton {...getButtonProps('bigKey')} />
                    <RequiredItemButton {...getButtonProps('smallKey')} />
                </Row>
                <Row>
                    <RequiredItemButton {...getButtonProps('blueSwitch')} />
                    <RequiredItemButton {...getButtonProps('redSwitch')} />
                    <RequiredItemButton {...getButtonProps('dam')} />
                    <RequiredItemButton {...getButtonProps('attic')} />
                    <RequiredItemButton {...getButtonProps('other')} />
                </Row>
            </Container>
            <Actions>
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
            </Actions>
        </>}
    </StyledModal>
}

export default RequiredItemModal