import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { layout } from '../../shared-variables';
import { themeVariables } from '../../utils/theme';

const size = akGridSizeUnitless * 3;
const offsetLeft = akGridSizeUnitless * 3.5;
const openPadding = `0 ${akGridSizeUnitless * 2}px 0 ${offsetLeft - (akGridSizeUnitless * 2)}px`;
const compactPadding = `0 ${akGridSizeUnitless}px 0 0`;
const closedHorizontalPadding =
  (layout.width.closed - (akGridSizeUnitless * 4) - size) / 2;
const closedPadding = `0 ${closedHorizontalPadding}px 0 ${closedHorizontalPadding}px`;

const NavigationItemIcon = styled.div`
  transition: padding 200ms;
  padding: ${({ theme }) => (theme[themeVariables.isCompact] ? compactPadding : openPadding)}
  display: flex;
  flex-shrink: 0;

  [data-__ak-navigation-container-closed="true"] & {
    padding: ${closedPadding};
  }

  /* We need to ensure that any image passed in as a child (<img/>, <svg/>
  etc.) receives the correct width, height and border radius. We don't
  currently assume that the image passed in is the correct dimensions, or has
  width / height 100% */
  > * {
    flex: 1 0 auto;
    height: ${size}px;
    width: ${size}px;
  }
`;

NavigationItemIcon.defaultProps = {
  theme: {
    [themeVariables.isCompact]: false,
  },
};

NavigationItemIcon.displayName = 'NavigationItemIcon';
export default NavigationItemIcon;
