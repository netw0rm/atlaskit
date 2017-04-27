import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { colors } from '../../shared-variables';
import { appearanceEnum, themeVariables } from '../../utils/theme';

const dividerLineHeight = 2;
const dividerTotalHeight = akGridSizeUnitless * 5;

const NavigationItemGroupSeparator = styled.div`
  margin-top: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  margin-bottom: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  height: ${dividerLineHeight}px;
  background: ${({ theme }) => {
    console.log('appearance', theme);

    return colors[theme[themeVariables.appearance]].keyline;
  }}
`;

NavigationItemGroupSeparator.defaultProps = {
  theme: {
    [themeVariables.appearance]: appearanceEnum.container,
  },
};

NavigationItemGroupSeparator.displayName = 'NavigationItemGroupSeparator';
export default NavigationItemGroupSeparator;
