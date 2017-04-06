import { akColorN90 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const NavigationItemSubText = styled.div`
  color: ${akColorN90};
  font-size: ${({ theme }) => (theme.NavigationItemIsCompact ? '10px' : '12px')};
  line-height: ${({ theme }) => (theme.NavigationItemIsCompact ? '12px' : 'normal')};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

NavigationItemSubText.displayName = 'NavigationItemSubText';
export default NavigationItemSubText;
