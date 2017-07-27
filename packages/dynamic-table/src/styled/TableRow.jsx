import styled from 'styled-components';
import { onClickStyle, truncateStyle, cellStyle } from './constants';
import { PKG_NM } from './theme';
import { theme } from '../../../theme/src';

export const TableBodyRow = styled.tr`
  ${props => onClickStyle(props)}
  &:hover {
    background: ${p => theme(p)[PKG_NM].tr.background.hover};
  }
`;

export const TableBodyCell = styled.td`
  ${props => onClickStyle(props)}
  ${props => truncateStyle(props)}
  ${cellStyle}
`;
