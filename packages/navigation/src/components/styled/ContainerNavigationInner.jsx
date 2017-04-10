import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { container } from '../../shared-variables';

const getColor = (appearance = 'container') =>
  container.colors[appearance];

const ContainerNavigationInner = styled.div`
  box-sizing: border-box;
  color: ${({ appearance }) => getColor(appearance).color};
  background-color: ${({ appearance }) => getColor(appearance).background};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  xpadding: ${akGridSizeUnitless * 3}px ${akGridSizeUnitless}px 0 ${akGridSizeUnitless}px;
  // fixes bug in position: sticky
  perspective: 1px;
`;

ContainerNavigationInner.displayName = 'ContainerNavigationInner';

export default ContainerNavigationInner;
