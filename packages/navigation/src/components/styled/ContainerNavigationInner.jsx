import styled from 'styled-components';
import { container } from '../../shared-variables';

const getColor = (appearance = 'container') =>
  container.colors[appearance];

const ContainerNavigationInner = styled.div`
  background-color: ${({ appearance }) => getColor(appearance).background};
  box-sizing: border-box;
  color: ${({ appearance }) => getColor(appearance).color};
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: ${({ theme }) => (theme.isCollapsed ? container.padding.top : 0)}px;
  padding-left: ${({ theme }) => (theme.isCollapsed ? container.padding.side : 0)}px;
  padding-right: ${({ theme }) => (theme.isCollapsed ? container.padding.side : 0)}px;
  padding-bottom: 0;
  width: 100%;

  // needed to fix sticky header on retina displays 🙃
  transform-style: preserve-3d;
`;

ContainerNavigationInner.displayName = 'ContainerNavigationInner';

export default ContainerNavigationInner;
