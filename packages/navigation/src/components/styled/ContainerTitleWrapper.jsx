import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const ContainerTitleWrapper = styled.div`
  margin-bottom: 8px;
  padding: 0 ${gridSize * 1.75}px 0 ${gridSize * 1.5}px;

  ${whenCollapsed`
    padding: 0;
  `}
`;

ContainerTitleWrapper.displayName = 'ContainerTitleWrapper';
export default ContainerTitleWrapper;
