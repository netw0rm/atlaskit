import { akColorN90 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const compactFontSize = '10px';
const defaultFontSize = '12px';
const compactLineHeight = '12px';
const defaultLineHeight = 'normal';

const NavigationItemSubText = styled.div`
  color: ${akColorN90};
  font-size: ${({ theme }) => (theme.NavigationItemIsCompact ? compactFontSize : defaultFontSize)};
  line-height: ${({ theme }) => (theme.NavigationItemIsCompact ? compactLineHeight : defaultLineHeight)};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

NavigationItemSubText.displayName = 'NavigationItemSubText';
export default NavigationItemSubText;
