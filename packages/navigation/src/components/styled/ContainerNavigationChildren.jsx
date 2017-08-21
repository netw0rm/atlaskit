import styled from 'styled-components';
import { drawerContainerHeaderAnimationSpeed, gridSize, scrollbar } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const ContainerNavigationChildren = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  justify-content: flex-start;
  overflow-y: ${props => (props.isCollapsed ? 'hidden' : 'auto')};
  padding: 0 ${gridSize * 2}px ${gridSize}px ${gridSize * 2}px;
  transition: padding ${drawerContainerHeaderAnimationSpeed};

  ${whenCollapsed`
    padding: 0 ${gridSize}px ${gridSize}px ${gridSize}px;
  `}

  /* The following styles are to style scrollbars when there is long/wide content*/
  -ms-overflow-style: -ms-autohiding-scrollbar;
  &::-webkit-scrollbar {
    height: ${scrollbar.size}px;
    width: ${scrollbar.size}px;
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${scrollbar.background};
    border-radius: ${scrollbar.size}px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${scrollbar.hoverBackground};
  }
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
