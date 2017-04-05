import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { container } from '../../shared-variables';

const ContainerNavigationInner = styled.div`
  box-sizing: border-box;
  color: ${({ appearance }) => container.colors[appearance].color};
  background-color: ${({ appearance }) => container.colors[appearance].background};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  xpadding: ${akGridSizeUnitless * 3}px ${akGridSizeUnitless}px 0 ${akGridSizeUnitless}px;
  // fixes bug in position: sticky
  perspective: 1px;
`;

ContainerNavigationInner.defaultProps = {
  appearance: 'container',
};

export default ContainerNavigationInner;
