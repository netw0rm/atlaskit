import styled from 'styled-components';
import { gridSize, layout, scrollbar } from '../../shared-variables';

const ContainerNavigationChildren = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  justify-content: flex-start;
  overflow-y: ${props => (props.isCollapsed ? 'hidden' : 'auto')};
  padding: ${gridSize}px ${layout.padding.side}px;

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
