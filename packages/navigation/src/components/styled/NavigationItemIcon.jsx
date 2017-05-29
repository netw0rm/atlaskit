import styled from 'styled-components';
import { layout, gridSize } from '../../shared-variables';
import { isInCompactGroup } from '../../theme/util';

const size = gridSize * 3;
const offsetLeft = gridSize * 3;
const openPadding = `0 ${gridSize * 2}px 0 ${offsetLeft - (gridSize * 2)}px`;
const compactPadding = `0 ${gridSize}px 0 0`;
const closedHorizontalPadding = (layout.width.closed - (gridSize * 4) - size) / 2;
const closedPadding = `0 ${closedHorizontalPadding}px 0 ${closedHorizontalPadding}px`;

const NavigationItemIcon = styled.div`
  transition: padding 200ms;
  padding: ${({ theme }) => (isInCompactGroup(theme) ? compactPadding : openPadding)};
  display: flex;
  flex-shrink: 0;

  ${({ hasNoPadding }) => (hasNoPadding ? 'padding: 0px' : '')};

  [data-__ak-navigation-container-closed="true"] & {
    padding: ${closedPadding};
    ${({ isDropdownTrigger }) => (isDropdownTrigger ? 'display: none' : '')}
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

NavigationItemIcon.displayName = 'NavigationItemIcon';
export default NavigationItemIcon;
