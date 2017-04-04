import {
  akGridSizeUnitless,
  akColorN0,
  akColorN20A,
  akColorN80A,
  akColorN50A,
  akColorN700A,
  akColorB50,
  akColorB200,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { defaultTheme } from '../js/NavigationItem';
import focusRingMixin from '../../utils/focus-ring-mixin';

const colors = {
  container: {
    default: {
      background: 'transparent',
      color: 'inherit',
    },
    hover: {
      background: akColorN20A,
    },
    active: {
      background: akColorB50,
      color: akColorB400,
    },
    selected: {
      background: akColorN20A,
      color: akColorB400,
    },
  },
  global: {
    default: {
      background: 'transparent',
      color: 'inherit',
    },
    hover: {
      background: akColorN80A,
    },
    active: {
      background: akColorB200,
      color: akColorN0,
    },
    selected: {
      background: akColorN50A,
      color: akColorN0,
    },
  },
  settings: {
    default: {
      background: 'transparent',
      color: 'inherit',
    },
    hover: {
      background: akColorN700A,
    },
    active: {
      background: 'rgba(255, 255, 255, 0.08)',
      color: akColorN0,
    },
    selected: {
      background: akColorN700A,
      color: akColorN0,
    },
  },
};

const borderRadius = 3;

function getColors(theme) {
  return colors[theme.NavigationAppearance];
}

function getHeight(theme) {
  return theme.NavigationItemIsCompact ? akGridSizeUnitless * 4.5 : akGridSizeUnitless * 5;
}

const NavigationItemOuter = styled.div`
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  height: ${({ theme }) => getHeight(theme)}px;
  position: relative;
  text-overflow: ellipsis;
  width: 100%;

  button, a {
    display: block;
    height: 100%;
    border-radius: ${borderRadius}px;
    background: ${({ isSelected, theme }) => (isSelected ? getColors(theme).selected.background : getColors(theme).default.background)};
    color: ${({ isSelected, theme }) => (isSelected ? getColors(theme).selected.color : getColors(theme).default.color)};
    text-decoration: none;

    ${focusRingMixin()}

    &:hover {
      background: ${({ theme }) => getColors(theme).hover.background};
    }

    &:active {
      background: ${({ theme }) => getColors(theme).active.background};
      color: ${({ theme }) => getColors(theme).active.color};
    }
  }
`;

NavigationItemOuter.defaultProps = {
  theme: defaultTheme,
};

export default NavigationItemOuter;

