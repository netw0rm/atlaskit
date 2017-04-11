import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { container } from '../../shared-variables';

const dividerLineHeight = 2;
const dividerTotalHeight = akGridSizeUnitless * 5;

const NavigationItemGroupSeparator = styled.div`
  margin-top: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  margin-bottom: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  height: ${dividerLineHeight}px;
  background: ${({ theme }) => container.colors[theme.NavigationAppearance].keyline};
`;

NavigationItemGroupSeparator.defaultProps = {
  theme: {
    NavigationAppearance: 'container',
    NavigationItemIsCompact: false,
  },
};

NavigationItemGroupSeparator.displayName = 'NavigationItemGroupSeparator';
export default NavigationItemGroupSeparator;
