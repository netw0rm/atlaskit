import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { getIsCollapsed, getProvided } from '../../theme/util';

const ContainerNavigationInner = styled.div`
  background-color: ${({ theme }) => {
    const background = getProvided(theme).background;
    if (background.secondary) {
      return background.secondary;
    }

    return background.primary;
  }};
  box-sizing: border-box;
  color: ${({ theme }) => getProvided(theme).text};
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: ${({ theme }) => (getIsCollapsed(theme) ? layout.padding.top : 0)}px;
  padding-left: ${({ theme }) => (getIsCollapsed(theme) ? layout.padding.side : 0)}px;
  padding-right: ${({ theme }) => (getIsCollapsed(theme) ? layout.padding.side : 0)}px;
  padding-bottom: 0;

  // needed to fix sticky header on retina displays 🙃
  transform-style: preserve-3d;
`;

ContainerNavigationInner.displayName = 'ContainerNavigationInner';

export default ContainerNavigationInner;
