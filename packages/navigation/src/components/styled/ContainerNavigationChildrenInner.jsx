// @flow
import styled from 'styled-components';

import { gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const ContainerNavigationChildrenInner = styled.div`
  flex: 1 1 100%;
  padding: 0 ${gridSize * 2}px ${gridSize}px ${gridSize * 2}px;

  ${whenCollapsed`
    padding: 0 ${gridSize}px ${gridSize}px ${gridSize}px;
  `}
`;
ContainerNavigationChildrenInner.displayName = 'ContainerNavigationChildrenInner';
export default ContainerNavigationChildrenInner;
