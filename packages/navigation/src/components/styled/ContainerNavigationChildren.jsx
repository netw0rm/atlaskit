import styled from 'styled-components';
import { gridSize, layout } from '../../shared-variables';

const ContainerNavigationChildren = styled.div`
  justify-content: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
  padding: ${gridSize}px ${layout.padding.side}px;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
