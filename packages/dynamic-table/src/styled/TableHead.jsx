import styled from 'styled-components';
import { onClickStyle, truncateStyle, arrowsStyle, cellStyle } from './constants';
import Theme from './theme';

export const Head = styled.thead`
  border-bottom: 2px solid ${Theme.th.border.color};
`;

export const HeadCell = styled.th`
  ${props => onClickStyle(props)}
  ${props => truncateStyle(props)}
  ${props => arrowsStyle(props)}
  ${cellStyle}
  border: none;
  color: ${Theme.th.text.color};
  font-size: 12px;
  font-weight: 600;
  position: relative;
  text-align: left;
  vertical-align: top;
`;
