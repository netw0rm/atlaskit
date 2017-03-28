import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { containerClosedWidth } from '../../shared-variables';

const size = akGridSizeUnitless * 3;
const offsetLeft = akGridSizeUnitless * 3.5;
const openPadding = `0 ${akGridSizeUnitless * 2}px 0 ${offsetLeft - (akGridSizeUnitless * 2)}px`;
const compactPadding = `0 ${akGridSizeUnitless}px 0 0`;
const closedHorizontalPadding = (containerClosedWidth - (akGridSizeUnitless * 4) - size) / 2;
const closedPadding = `0 ${closedHorizontalPadding}px 0 ${closedHorizontalPadding}px`;

export default styled.div`
  transition: padding 200ms;
  padding: ${({ theme }) => (theme.NavigationItemIsCompact ? compactPadding : openPadding)}
  display: flex;
  flex-shrink: 0;

  [data-__ak-navigation-container-closed="true"] & {
    padding: ${closedPadding};
  }

  > * {
    flex: 1 0 auto;
    height: ${size}px;
    width: ${size}px;
  }
`;
