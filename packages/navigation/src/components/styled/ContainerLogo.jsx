import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const ContainerLogo = styled.div`
  height: ${gridSize * 5}px;
  padding: ${gridSize}px ${gridSize / 2}px;
`;

ContainerLogo.displayName = 'ContainerLogo';
export default ContainerLogo;
