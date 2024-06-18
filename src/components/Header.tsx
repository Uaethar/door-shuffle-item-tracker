import React from 'react'
import bigKey from '../img/bigKey.png'
import chest from '../img/chest.png'
import compass from '../img/compass.png'
import map from '../img/map.png'
import smallKey from '../img/smallKey.png'
import { TableCell, TableRow, Table } from '../styles/Table.styles'

const Header: React.FC = () => {
  return (
      <thead>
        <TableRow>
          <TableCell rowspan={2} $br $bb />
          <TableCell rowspan={2} $br $bl $bb>
            E
          </TableCell>
          <TableCell rowspan={2} $br $bl $bb>
            <img src={map} height={20} alt="map" />
          </TableCell>
          <TableCell rowspan={2} $br $bl $bb>
            <img src={compass} height={20} alt="compass" />
          </TableCell>
          <TableCell rowspan={2} $br $bl $bb>
            <img src={bigKey} height={20} alt="bigKey" />
          </TableCell>
          <TableCell colspan={3} $br $bl>
            <img src={smallKey} height={20} alt="smallKey" />
          </TableCell>
          <TableCell colspan={2} $br $bl>
            <img src={chest} height={20} alt="chest" />
          </TableCell>
          <TableCell colspan={4} rowspan={2} $bl $bb>
            Notes
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell $bl $bb>F</TableCell>
          <TableCell $bb>T</TableCell>
          <TableCell $br $bb>C</TableCell>
          <TableCell $bl $bb>F</TableCell>
          <TableCell $br $bb>T</TableCell>
        </TableRow>
      </thead>
  )
}

export default Header
