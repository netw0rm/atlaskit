import {
  akColorB500,
  akColorN800,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { layout, globalOpenWidth } from '../../shared-variables';
import { appearanceEnum, themeVariables } from '../../utils/theme';

const colors = {
  global: {
    background: akColorB500,
  },
  settings: {
    background: akColorN800,
  },
};

const GlobalNavigationInner = styled.div`
  align-items: center;
  background-color: ${({ theme }) => colors[theme[themeVariables.appearance]].background};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${layout.padding.top}px ${layout.padding.side}px ${layout.padding.top}px;
  position: fixed;
  width: ${globalOpenWidth}px;
`;

GlobalNavigationInner.defaultProps = {
  theme: {
    [themeVariables.appearance]: appearanceEnum.global,
  },
};

GlobalNavigationInner.displayName = 'GlobalNavigationInner';
export default GlobalNavigationInner;
