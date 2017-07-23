import styled from 'styled-components';
import { onClickStyle, truncateStyle, cellStyle } from './constants';
import Theme from './theme';

export const TableBodyRow = styled.tr`
  ${props => onClickStyle(props)}
  &:hover {
    background: ${Theme.tr.background.hover};
  }
`;

export const TableBodyCell = styled.td`
  ${props => onClickStyle(props)}
  ${props => truncateStyle(props)}
  ${cellStyle}
`;
