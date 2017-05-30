import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const ContainerTitleTextWrapper = styled.div`
  margin-left: ${gridSize}px;
  width: 100%;
  min-width: 0;

  [data-__ak-navigation-container-closed="true"] & {
    display: none;
  }
`;

ContainerTitleTextWrapper.displayName = 'ContainerTitleTextWrapper';
export default ContainerTitleTextWrapper;
