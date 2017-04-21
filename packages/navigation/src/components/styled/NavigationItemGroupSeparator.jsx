import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { container } from '../../shared-variables';
import {
  akGridSizeUnitless,
  akColorN20A,
  akColorN50A,
  akColorN900,
 } from '@atlaskit/util-shared-styles';
import { appearanceEnum, themeVariables } from '../../utils/theme';

const dividerLineHeight = 2;
const dividerTotalHeight = akGridSizeUnitless * 5;

const NavigationItemGroupSeparator = styled.div`
  margin-top: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  margin-bottom: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  height: ${dividerLineHeight}px;
  background: ${({ theme }) => colors[theme[themeVariables.appearance]]};
`;

NavigationItemGroupSeparator.defaultProps = {
  theme: {
    [themeVariables.appearance]: appearanceEnum.container,
    [themeVariables.isCompact]: false,
  },
};

NavigationItemGroupSeparator.displayName = 'NavigationItemGroupSeparator';
export default NavigationItemGroupSeparator;
