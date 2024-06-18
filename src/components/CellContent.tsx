import React from 'react';
import { styled } from 'styled-components'

const Content = styled.div`
  width: 100%;
  font-size: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1)
  }
`

type Props = {
    onLeftClick?: () => void,
    onRightClick?: () => void,
    children?: React.ReactNode
}

const CellContent: React.FC<Props> = ({ onLeftClick, onRightClick, children }) => {

    return <Content
        onClick={onLeftClick}
        onContextMenu={(event) => {
            event.preventDefault()
            onRightClick?.()
        }}
    >
        {children}
    </Content>
}

export default CellContent