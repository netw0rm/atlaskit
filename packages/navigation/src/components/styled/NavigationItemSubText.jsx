import { akColorN90 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { themeVariables } from '../../utils/theme';

const compactFontSize = '10px';
const defaultFontSize = '12px';
const compactLineHeight = '12px';
const defaultLineHeight = 'normal';

const NavigationItemSubText = styled.div`
  color: ${akColorN90};
  font-size: ${({ theme }) => (theme[themeVariables.isCompact] ? compactFontSize : defaultFontSize)};
  line-height: ${({ theme }) => (theme[themeVariables.isCompact] ? compactLineHeight : defaultLineHeight)};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

NavigationItemSubText.displayName = 'NavigationItemSubText';
export default NavigationItemSubText;
