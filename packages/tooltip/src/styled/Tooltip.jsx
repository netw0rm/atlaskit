/* eslint-disable arrow-body-style */
/* eslint-disable no-confusing-arrow */

import styled, { keyframes } from 'styled-components';
import {
  akAnimationMixins,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

import { themeValue, addThemeComponent } from '../../../theme/src';

addThemeComponent('tooltip', (mode, theme) => {
  return mode === 'dark'
    ? {
      backgroundColor: theme.colors.DN80,
      textColor: theme.colors.DN800,
    }
    : {
      backgroundColor: theme.colors.N800,
      textColor: theme.colors.N0,
    };
});

const { createBold, interpolate } = akAnimationMixins;

// common constants
const grid = akGridSizeUnitless / 2;
const fontSize = 3 * grid;

// animation constants
const animDistance = 3 * grid;
const animDelay = 0.1;
const animTime = animDelay + 1;

// properties to animate
const slideUp = {
  property: 'transform',
  value: interpolate`translateY(${t => t}px)`,
  deltas: [{ from: animDistance, to: 0 }],
};
const slideDown = {
  property: 'transform',
  value: interpolate`translateY(${t => t}px)`,
  deltas: [{ from: -animDistance, to: 0 }],
};
const slideLeft = {
  property: 'transform',
  value: interpolate`translateX(${t => t}px)`,
  deltas: [{ from: animDistance, to: 0 }],
};
const slideRight = {
  property: 'transform',
  value: interpolate`translateX(${t => t}px)`,
  deltas: [{ from: -animDistance, to: 0 }],
};
const fadeIn = {
  property: 'opacity',
  deltas: [{ from: 0, to: 1 }],
};

// positioning maps to create keyframes
const KEYFRAMES = {
  bottom: keyframes`${createBold([slideDown, fadeIn])}`,
  left: keyframes`${createBold([slideLeft, fadeIn])}`,
  right: keyframes`${createBold([slideRight, fadeIn])}`,
  top: keyframes`${createBold([slideUp, fadeIn])}`,
};
const KEYFRAMES_FLIPPED = {
  bottom: KEYFRAMES.top,
  left: KEYFRAMES.right,
  right: KEYFRAMES.left,
  top: KEYFRAMES.bottom,
};
const getKeyframeName = ({ isFlipped, position }) =>
  isFlipped ? KEYFRAMES_FLIPPED[position] : KEYFRAMES[position];

// apply all the things
export default styled.div`
  animation: ${getKeyframeName} ${animTime}s ${animDelay}s backwards;
  background-color: ${themeValue('tooltip.backgroundColor')};
  border-radius: 3px;
  box-sizing: border-box;
  color: ${themeValue('tooltip.textColor')};
  color: ${themeValue('tooltip.textColor')};
  font-size: ${fontSize}px;
  line-height: ${(4 * grid) / fontSize};
  margin: ${2 * grid}px;
  max-width: ${105 * grid}px;
  padding: ${grid / 2}px ${2 * grid}px;
  pointer-events: none;
  white-space: nowrap;
`;
