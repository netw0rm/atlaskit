import {
  akGridSizeUnitless,
  akColorN0,
  akColorN20A,
  akColorN50A,
  akColorB50,
  akColorB100,
  akColorB400,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { defaultTheme } from '../js/NavigationItem';

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
      background: akColorN20A,
    },
    active: {
      background: akColorN20A,
      color: akColorN0,
    },
    selected: {
      background: akColorN50A,
      color: akColorN0,
    },
  },
};

const borderRadius = 3;

function getColors(theme) {
  return colors[theme.appearance];
}

const NavigationItemOuter = styled.div`
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  height: ${akGridSizeUnitless * 5}px;
  position: relative;
  text-overflow: ellipsis;
  width: 100%;

  button, a {
    display: block;
    height: 100%;
    border-radius: ${borderRadius}px;
    background: ${({ isSelected, theme }) => (isSelected ? getColors(theme).selected.background : getColors(theme).default.background)};
    color: ${({ isSelected, theme }) => (isSelected ? getColors(theme).selected.color : getColors(theme).default.color)};

    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 2px ${akColorB100};
    }

    &:hover {
      background: ${({ theme }) => getColors(theme).hover.color};
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

