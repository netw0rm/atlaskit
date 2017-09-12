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
  flex: 1 1 100%;
  height: 100%;
  justify-content: flex-start;
  overflow-y: ${props => (props.isCollapsed ? 'hidden' : 'auto')};
  transition: padding ${drawerContainerHeaderAnimationSpeed};
  padding: 0 ${scrollHintSpacing}px ${bottomPadding}px ${scrollHintSpacing}px;

  ${whenCollapsed`
    padding: 0 ${gridSize}px ${gridSize}px ${gridSize}px;
  `}

  ${whenNotCollapsed`
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
