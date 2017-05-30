import styled from 'styled-components';

import { focusOutline } from '../../utils/mixins';
import { isInCompactGroup, getProvided, isCollapsed } from '../../theme/util';
import { item } from '../../shared-variables';

const itemBorderRadius = item.borderRadius;
const nestedBackButtonMargin = 2;
const getWrapperHeight = ({ theme }) => `${isInCompactGroup(theme) ? item.width.compact : item.width.standard}px`;
const getWrapperWidth = ({ theme }) => (isCollapsed(theme) ? '100%' : getWrapperHeight);

const BackButtonWrapper = styled.div`
  border-radius: ${itemBorderRadius}px;
  height: ${getWrapperHeight};
  width: ${getWrapperWidth};
  position: relative;
  flex-shrink: 0; /* prevent the button from shrinking, width and height should always be the same. */
  text-align: center;
  margin-right: ${nestedBackButtonMargin}px;
  
  [dir="rtl"] & {
    margin-right: 0;
    margin-left: ${nestedBackButtonMargin}px;
  }

  button {
    background-color: ${({ theme }) => getProvided(theme).item.default.background};
    border-radius: ${itemBorderRadius}px;
    color: ${({ theme }) => getProvided(theme).text}
    display: block;
    /* In theory this wouldn't be required, but Chrome does not place focus styles correctly without it */
    position: relative;
    text-decoration: none;

    &:focus {
      ${({ theme }) => focusOutline(getProvided(theme).item.focus.outline)}
    }

    &:hover {
      background-color: ${({ theme }) => getProvided(theme).item.hover.background};
    }

    &:active {
      background-color: ${({ theme }) => getProvided(theme).item.active.background};
    }
  }
`;

BackButtonWrapper.displayName = 'BackButtonWrapper';
export default BackButtonWrapper;
