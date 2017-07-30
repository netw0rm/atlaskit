// @flow
import styled from 'styled-components';
import { akTypographyMixins } from '@atlaskit/util-shared-styles';
import { whenCollapsed } from '../../theme/util';
import { truncate } from '../../utils/mixins';

const NavigationItemGroupTitle = styled.div`
  ${akTypographyMixins.h300}
  ${truncate()}

  ${whenCollapsed`
    display: none;
  `}
`;

NavigationItemGroupTitle.displayName = 'NavigationItemGroupTitle';
export default NavigationItemGroupTitle;
