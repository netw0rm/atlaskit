import styled from 'styled-components';
import { containerNav, colors } from '../../shared-variables';
import { appearanceEnum, themeVariables } from '../../utils/theme';

const ContainerNavigationInner = styled.div`
  background-color: ${({ theme }) => colors[theme[themeVariables.appearance]].background};
  box-sizing: border-box;
  color: ${({ theme }) => colors[theme[themeVariables.appearance]].color};
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: ${({ theme }) => (theme.isCollapsed ? containerNav.padding.vertical : 0)}px;
  padding-left: ${({ theme }) => (theme.isCollapsed ? containerNav.padding.horiztonal : 0)}px;
  padding-right: ${({ theme }) => (theme.isCollapsed ? containerNav.padding.horiztonal : 0)}px;
  padding-bottom: 0;
  width: 100%;

  // needed to fix sticky header on retina displays 🙃
  transform-style: preserve-3d;
`;

ContainerNavigationInner.defaultProps = {
  [themeVariables.appearance]: appearanceEnum.container,
};

ContainerNavigationInner.displayName = 'ContainerNavigationInner';

export default ContainerNavigationInner;
