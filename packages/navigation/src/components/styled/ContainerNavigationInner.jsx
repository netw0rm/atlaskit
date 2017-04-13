import {
  akColorN0,
  akColorN20,
  akColorN500,
  akColorN700,
  akColorB500,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { appearanceEnum, themeVariables } from '../../utils/theme';

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
  background-color: ${({ theme }) => colors[theme[themeVariables.appearance]].background};
  box-sizing: border-box;
  color: ${({ theme }) => colors[theme[themeVariables.appearance]].color};
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${akGridSizeUnitless * 3}px ${akGridSizeUnitless}px 0 ${akGridSizeUnitless}px;
  width: 100%;
`;

ContainerNavigationInner.defaultProps = {
  [themeVariables.appearance]: appearanceEnum.container,
};

ContainerNavigationInner.displayName = 'ContainerNavigationInner';
export default ContainerNavigationInner;
