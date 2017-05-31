// @flow
import styled from 'styled-components';
import {
  akTypographyMixins,
} from '@atlaskit/util-shared-styles';
import { getProvided } from '../../theme/util';
import { truncate } from '../../utils/mixins';

const NavigationItemGroupTitle = styled.div`
  ${akTypographyMixins.h300}
  margin-top: 0;
  align-self: center;
  color: ${({ theme }) => getProvided(theme).subText};
  display: flex;
  flex-grow: 1;
  font-size: 12px;
  text-transform: uppercase;
  ${truncate()}

  [data-__ak-navigation-container-closed="true"] & {
    visibility: hidden;
  }
`;

NavigationItemGroupTitle.displayName = 'NavigationItemGroupTitle';
export default NavigationItemGroupTitle;
