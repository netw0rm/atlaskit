// @flow
import styled from 'styled-components';
import {
  gridSize,
  drawerContainerHeaderAnimationSpeed,
  scrollbar,
  scrollHintSpacing,
  scrollHintHeight,
} from '../../shared-variables';
import { whenCollapsed, whenNotCollapsed, getProvided } from '../../theme/util';

const bottomPadding = gridSize;

const ScrollHintScrollContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* Flex-basis must be set to auto and width set to 100% instead to prevent box-sizing issues
   * in IE11.
   * See https://github.com/philipwalton/flexbugs#7-flex-basis-doesnt-account-for-box-sizingborder-box
   */
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  transition: padding ${drawerContainerHeaderAnimationSpeed};
  /* Let nested nav define its own padding so its scrollbars align with the edge of the nav */
  padding: ${({ isNested }) => (isNested
    ? `0 0 ${bottomPadding}px 0`
    : `0 ${scrollHintSpacing}px ${bottomPadding}px ${scrollHintSpacing}px`
  )};

  ${whenCollapsed`
    overflow: hidden;
    padding: 0 ${gridSize}px;
  `}

  ${whenNotCollapsed`
    overflow-y: auto;

    &:before,
    &:after {
      background: ${({ theme }) => getProvided(theme).background.secondary || getProvided(theme).background.primary};
      content: '';
      display: block;
      flex: 0;
      min-height: ${scrollHintHeight}px;
      position: relative;
      z-index: 5;
    }

    &:after {
      top: ${bottomPadding}px;
    }

    /* The following styles are to style scrollbars when there is long/wide content */
    -ms-overflow-style: -ms-autohiding-scrollbar;
    &::-webkit-scrollbar {
      height: ${scrollbar.size}px;
      width: ${scrollbar.size}px;
    }
    &::-webkit-scrollbar-corner {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0);
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: ${scrollbar.background};
      border-radius: ${scrollbar.size}px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: ${scrollbar.hoverBackground};
    }
  `}
`;
ScrollHintScrollContainer.displayName = 'ScrollHintScrollContainer';
export default ScrollHintScrollContainer;
