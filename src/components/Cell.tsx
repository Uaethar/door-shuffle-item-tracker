import React from 'react';
import { styled } from 'styled-components'

const StyledCell = styled.div`
  width: 24px;
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

const Cell: React.FC<Props> = ({ onLeftClick, onRightClick, children }) => {

    return <StyledCell
        onClick={onLeftClick}
        onContextMenu={(event) => {
            event.preventDefault()
            onRightClick?.()
        }}
    >
        {children}
    </StyledCell>
}

export default Cell