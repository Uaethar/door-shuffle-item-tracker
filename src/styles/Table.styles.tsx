import styled from 'styled-components'

export const Table = styled.table`
    background-color: #404040;
    border-collapse: collapse;
    & tbody tr:nth-of-type(odd) {
        background-color: #505050;
    }
`

export const TableRow = styled.tr`
    height: 24px;
    tbody &:hover {
        background-color: #606060
    }
`

type TableCellStyleProps = {
    colspan?: number,
    rowspan?: number,
    $bt?: boolean,
    $bb?: boolean,
    $bl?: boolean,
    $br?: boolean,
    $clickable?: boolean
}

export const TableCell = styled.td<TableCellStyleProps>`
    height: ${(props) => (props.rowspan ?? 1) * 25}px;
    width: ${(props) => (props.colspan ?? 1) * 25}px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    cursor: ${props => props.$clickable ? 'pointer' : 'default'};
    &:hover {
        background-color: ${props => props.$clickable ? 'rgba(255, 255, 255, 0.1)' : undefined};
    }
    border-top: ${props => props.$bt ? '1px solid #fff' : undefined};
    border-bottom: ${props => props.$bb ? '1px solid #fff' : undefined};
    border-left: ${props => props.$bl ? '1px solid #fff' : undefined};
    border-right: ${props => props.$br ? '1px solid #fff' : undefined};
`