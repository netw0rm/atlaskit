import styled from 'styled-components';
import { gridSize, layout } from '../../shared-variables';

const ContainerNavigationChildren = styled.div`
  justify-content: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
  padding: ${gridSize}px ${layout.padding.side}px;

  &::-webkit-scrollbar {
    height: ${gridSize}px;
    width: ${gridSize}px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: ${gridSize}px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0,0,0,0.3);
  }
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
