import {
  akGridSizeUnitless,
  akColorN0,
  akColorN30,
  akColorN500,
  akColorN900,
  akColorN20A,
  akColorB500,
  akColorB50,
  akColorN90A,
  akColorB200,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const sizes = {
  small: 4 * akGridSizeUnitless,
  medium: 5 * akGridSizeUnitless,
  large: 6 * akGridSizeUnitless,
};

const colors = {
  container: {
    default: {
      background: 'transparent',
      color: akColorN500,
    },
    hover: {
      background: akColorN20A,
    },
    active: {
      background: akColorB500,
      color: akColorB50,
    },
  },
  global: {
    default: {
      background: 'transparent',
      color: akColorN0,
    },
    hover: {
      background: akColorN90A,
    },
    active: {
      background: akColorB200,
      color: akColorN0,
    },
  },
  settings: {
    default: {
      background: 'transparent',
      color: akColorN0,
    },
    hover: {
      background: akColorN900,
    },
    active: {
      background: akColorN500,
      color: akColorN30,
    },
  },
};

function getColors(theme) {
  return colors[theme.NavigationAppearance || 'global'];
}

const GlobalItemInner = styled.div`
  align-items: center;
  background-color: ${({ theme }) => getColors(theme).default.background}
  border-radius: 50%;
  color: ${({ theme }) => getColors(theme).default.color};
  cursor: pointer;
  display: flex;
  width: ${({ size }) => sizes[size]}px;
  height: ${({ size }) => sizes[size]}px;
  justify-content: center;
  margin-top: ${({ size }) => (size === 'small' ? akGridSizeUnitless : 0)}px;

  &:hover, &:focus {
    background-color: ${({ theme }) => getColors(theme).hover.background};
  }

  &:active {
    background-color: ${({ theme }) => getColors(theme).active.background};
    color: ${({ theme }) => getColors(theme).active.color};
  }
`;

GlobalItemInner.defaultProps = {
  theme: {
    NavigationAppearance: 'global',
  },
};

export default GlobalItemInner;
