import React from 'react'
import map from '../img/map.png'
import compass from '../img/compass.png'
import smallKey from '../img/smallKey.png'
import bigKey from '../img/bigKey.png'
import chest from '../img/chest.png'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 49px;
  border-bottom: 2px solid #fff
`

const Cell = styled.div<{ colSpan?: number }>`
  height: 100%;
  width: ${(props) => (props.colSpan ?? 1) * 24}px;
  min-width: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  font-size: 16px;
  &:not(:last-child) {
    border-right: 1px solid #fff;
  }
`

const SubCell = styled.div<{ colSpan?: number, rowSpan?: number }>`
    height: ${(props) => (props.rowSpan ?? 2) * 24}px;
    width: ${(props) => (props.colSpan ?? 1) * 24}px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Header: React.FC = () => {
  return <Container>
    <Cell>
    </Cell>
    <Cell>
      <SubCell>
        E
      </SubCell>
    </Cell>
    <Cell>
      <SubCell>
        <img src={map} height={20} alt="map" />
      </SubCell>
    </Cell>
    <Cell>
      <SubCell>
        <img src={compass} height={20} alt="compass" />
      </SubCell>
    </Cell>
    <Cell>
      <SubCell>
        <img src={bigKey} height={20} alt="bigKey" />
      </SubCell>
    </Cell>
    <Cell colSpan={3}>
      <SubCell colSpan={3} rowSpan={1}><img src={smallKey} height={20} alt="smallKey" /></SubCell>
        <SubCell rowSpan={1}>F</SubCell>
        <SubCell rowSpan={1}>T</SubCell>
        <SubCell rowSpan={1}>C</SubCell>
    </Cell>
    <Cell colSpan={2}>
      <SubCell colSpan={2} rowSpan={1}><img src={chest} height={20} alt="chest" /></SubCell>
      <SubCell rowSpan={1}>F</SubCell>
      <SubCell rowSpan={1}>T</SubCell>
    </Cell>
    <Cell colSpan={4}>
      <SubCell colSpan={4}>Notes</SubCell>
    </Cell>
  </Container>
}

export default Header
