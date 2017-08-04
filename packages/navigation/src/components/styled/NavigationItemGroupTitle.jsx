// @flow
import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';
import { truncate } from '../../utils/mixins';

const groupTitleFontSize = 11;

const NavigationItemGroupTitle = styled.div`
  font-size: ${groupTitleFontSize}px;
  line-height: ${16 / groupTitleFontSize};
  font-weight: 600;
  ${truncate()}

  ${whenCollapsed`
    display: none;
  `}
`;

NavigationItemGroupTitle.displayName = 'NavigationItemGroupTitle';
export default NavigationItemGroupTitle;
