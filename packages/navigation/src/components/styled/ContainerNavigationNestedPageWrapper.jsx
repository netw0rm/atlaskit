import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const ContainerNavigationNestedPageWrapper = styled.div`
  flex: 1 0 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 ${gridSize}px;
`;

ContainerNavigationNestedPageWrapper.displayName = 'ContainerNavigationNestedPageWrapper';
export default ContainerNavigationNestedPageWrapper;
