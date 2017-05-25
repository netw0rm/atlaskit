import styled from 'styled-components';
import { getProvided } from '../../theme/util';

const compactFontSize = '10px';
const defaultFontSize = '12px';
const compactLineHeight = '12px';
const defaultLineHeight = 'normal';

const NavigationItemSubText = styled.div`
  color: ${({ theme }) => (getProvided(theme).subText)};
  font-size: ${({ isCompact }) => (isCompact ? compactFontSize : defaultFontSize)};
  line-height: ${({ isCompact }) => (isCompact ? compactLineHeight : defaultLineHeight)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

NavigationItemSubText.displayName = 'NavigationItemSubText';
export default NavigationItemSubText;
