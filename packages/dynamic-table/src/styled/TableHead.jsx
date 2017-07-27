import styled from 'styled-components';
import { onClickStyle, truncateStyle, arrowsStyle, cellStyle } from './constants';
import { PKG_NM } from './theme';
import { theme } from '../../../theme/src';

export const Head = styled.thead`
  border-bottom: 2px solid ${p => theme(p)[PKG_NM].th.border.color};
`;

export const HeadCell = styled.th`
  ${p => onClickStyle(p)}
  ${p => truncateStyle(p)}
  ${p => arrowsStyle(p)}
  ${cellStyle}
  border: none;
  color: ${p => theme(p)[PKG_NM].th.text.color};
  font-size: 12px;
  font-weight: 600;
  position: relative;
  text-align: left;
  vertical-align: top;
`;
