/* eslint-disable no-confusing-arrow */

/* TODO: finish migrating constants from util-shared-styles */

import styled, { keyframes } from 'styled-components';
import {
  akAnimationMixins,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

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
const getKeyframeName = ({ isFlipped, position }) => isFlipped
  ? KEYFRAMES_FLIPPED[position]
  : KEYFRAMES[position];

const backgroundColor = themed({
  light: colors.N800,
  dark: colors.DN0,
});
const textColor = themed({
  light: colors.N0,
  dark: colors.DN600,
});

// apply all the things
export default styled.div`
  animation: ${getKeyframeName} ${animTime}s ${animDelay}s backwards;
  background-color: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  color: ${textColor};
  font-size: ${fontSize}px;
  line-height: ${(4 * grid) / fontSize};
  margin: ${gridSize}px;
  max-width: ${math.multiply(gridSize, 52)}px;
  padding: ${math.divide(gridSize, 4)}px ${gridSize}px;
  pointer-events: none;
  white-space: nowrap;
`;
