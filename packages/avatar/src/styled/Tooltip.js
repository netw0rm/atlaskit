import styled, { keyframes } from 'styled-components';
import {
  akAnimationMixins,
  akBorderRadius,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import { colors, themed } from '@atlaskit/theme';

const { createBold, interpolate } = akAnimationMixins;

const gutter = akGridSizeUnitless / 2;
const fontSize = 3 * gutter;
const lineHeight = (4 * gutter) / fontSize;
const maxWidth = 105 * gutter; // ~420px
const animationDistance = 2 * gutter;

const slideDown = {
  property: 'transform',
  value: interpolate`translateY(${y => y}px) translateX(-50%)`,
  deltas: [{ from: -animationDistance, to: 0 }],
};
const fadeOut = {
  property: 'opacity',
  deltas: [{ from: 0, to: 1 }],
};

const backgroundColor = themed({
  light: colors.N800,
  dark: colors.DN0,
});
const textColor = themed({
  light: colors.N0,
  dark: colors.DN600,
});

const Tooltip = styled.div`
  animation: ${keyframes`${createBold([slideDown, fadeOut])}`} 0.6s 0.1s backwards;
  background-color: ${backgroundColor};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  color: ${textColor};
  font-size: ${fontSize}px;
  left: 50%;
  line-height: ${lineHeight};
  margin-top: ${gutter}px;
  max-width: ${maxWidth}px;
  overflow: hidden;
  padding: ${gutter / 2}px ${gutter * 2}px;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1;
`;

export default Tooltip;
