import {
  akColorN0,
  akColorN20,
  akColorN500,
  akColorN700,
  akColorB500,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const colors = {
  container: {
    background: akColorN20,
    color: akColorN500,
  },
  global: {
    background: akColorB500,
    color: akColorN0,
  },
  settings: {
    background: akColorN700,
    color: akColorN0,
  },
};

const ContainerNavigationInner = styled.div`
  box-sizing: border-box;
  color: ${({ appearance }) => colors[appearance].color};
  background-color: ${({ appearance }) => colors[appearance].background};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${akGridSizeUnitless * 3}px ${akGridSizeUnitless}px 0 ${akGridSizeUnitless}px;
`;

ContainerNavigationInner.defaultProps = {
  appearance: 'container',
};

export default ContainerNavigationInner;
