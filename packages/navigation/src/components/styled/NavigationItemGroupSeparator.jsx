import styled from 'styled-components';
import {
    akGridSizeUnitless,
    akColorN20A,
    akColorN50A,
    akColorN900,
 } from '@atlaskit/util-shared-styles';

const colors = {
  container: akColorN20A,
  global: akColorN50A,
  settings: akColorN900,
};
const dividerLineHeight = 2;
const dividerTotalHeight = akGridSizeUnitless * 5;

export default styled.div`
  margin-top: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  margin-bottom: ${(dividerTotalHeight - dividerLineHeight) / 2}px;
  height: ${dividerLineHeight}px;
  background: ${({ theme }) => colors[theme.NavigationAppearance]};
`;
