import React from 'react'
import { RequiredItem } from '../config/types'
import ItemImage from './ItemImage'
import { styled } from 'styled-components'


const Container = styled.div`
    width: 96px;
    font-size: 12px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`

const Item = styled.div`
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    line-height: 10px;
    text-align: center;
`

const ItemEtc = styled(Item)`
    margin-top: -3px
`

type Props = {
    required: Array<RequiredItem>,
    openRequiredModal: VoidFunction
}

const RequiredItemList: React.FC<Props> = ({ required, openRequiredModal }) => {

    const requiredCount = React.useMemo(() => required.length, [required])

    return <Container
        onClick={() => openRequiredModal()}
        onContextMenu={(event) => event.preventDefault()}
    >
        {(requiredCount <= 4 ? required : required.slice(0, 3)).map((item, index) =>
            <Item key={index}>
                <ItemImage item={item} />
            </Item>
        )}
        {requiredCount > 4 && <ItemEtc>
            ...
        </ItemEtc>}
    </Container>
}

export default RequiredItemList