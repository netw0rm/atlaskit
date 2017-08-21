import styled, { css } from 'styled-components';
import { gridSize, fontSize, colors, themed } from '@atlaskit/theme';
import {
  getBackgroundColor,
  getBackgroundColorFocus,
  getBackgroundColorHover,
  getBorderColor,
  getBorderColorFocus,
  getBorderColorHover,
} from './theme';

const borderRadius = '5px';
const borderWidth = 1;
const borderWidthFocused = 2;
const borderWidthSubtle = 0;

const spacing = gridSize();
const heightBase = spacing * 5;
const heightCompact = spacing * 4;
const horizontalPadding = spacing;
const innerHeight = spacing * 2.5;
const lineHeight = innerHeight / fontSize();
const transitionDuration = '0.2s';

const getBorderAndPadding = ({ paddingDisabled, invalid, isFocused, compact, subtle, none }) => {
  let border;
  const height = compact ? heightCompact : heightBase;

  if (invalid || isFocused || none) border = borderWidthFocused;
  else if (subtle) border = borderWidthSubtle;
  else border = borderWidth;

  const padding = paddingDisabled
    ? 0
    : `${(height - (2 * border) - innerHeight) / 2}px ${horizontalPadding - border}px`;

  return css`
    border-width: ${border}px;
    padding: ${padding};
  `;
};

const getDisabledColor = themed({ light: colors.N60, dark: colors.N60 });

const getDisabledState = (p) => p.disabled && css`
  color: ${getDisabledColor(p)};
  pointer-events: none;
`;

const getHoverState = (p) => {
  if (p.readOnly || p.isFocused || p.none) return null;

  return css`
    &:hover {
      background-color: ${getBackgroundColorHover(p)};
      border-color: ${getBorderColorHover(p)};
    }
  `;
};

const getMargin = ({ appearance, isFocused, paddingDisabled, readOnly }) => {
  if (
    !isFocused ||
    appearance !== 'invalid' ||
    appearance === 'none' ||
    !paddingDisabled ||
    readOnly
  ) return null;

  const margin = appearance === 'subtle'
    ? borderWidthFocused
    : borderWidth;

  return css`margin: -${margin}px`;
};

export const Content = styled.div`
  ${p => getBorderAndPadding(p)}
  ${p => getMargin(p)}
  background-color: ${p => (p.isFocused ? getBackgroundColorFocus(p) : getBackgroundColor(p))};
  border-color: ${p => (p.isFocused ? getBorderColorFocus(p) : getBorderColor(p))};
  border-radius: ${borderRadius};
  border-style: ${p => (p.appearance === 'none' ? 'none' : 'solid')};
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  font-size: ${fontSize}px;
  justify-content: space-between;
  line-height: ${lineHeight};
  max-width: 100%;
  min-height: ${innerHeight}px;
  overflow: hidden;
  transition:
    background-color ${transitionDuration} ease-in-out,
    border-color ${transitionDuration} ease-in-out;
  word-wrap: break-word;

  ${p => getHoverState(p)}
  ${p => getDisabledState(p)}
`;

export const ContentWrapper = styled.div`
  ${p => (p.disabled && 'cursor: not-allowed;')}
  ${p => (p.grow && 'flex: 1 1 auto;')};
  align-items: center;
  display: flex;
  max-width: 100%;
`;
