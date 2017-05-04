import styled from 'styled-components';
import {
  akColorB75,
  akColorN90,
  akTypographyMixins,
} from '@atlaskit/util-shared-styles';
import { themeVariables } from '../../utils/theme';

const NavigationItemGroupTitle = styled.div`
  ${akTypographyMixins.h300}
  margin-top: 0;
  align-self: center;
  color: ${({ theme }) => {
    if (theme[themeVariables.appearance] === 'global') {
      return akColorB75;
    }

    return akColorN90;
  }};
  display: flex;
  flex-grow: 1;
  font-size: 12px;
  text-transform: uppercase;
  
  [data-__ak-navigation-container-closed="true"] & {
    visibility: hidden;
  }
`;

NavigationItemGroupTitle.displayName = 'NavigationItemGroupTitle';
export default NavigationItemGroupTitle;
