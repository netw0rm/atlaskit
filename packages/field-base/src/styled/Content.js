import styled, { css } from 'styled-components';
import { gridSize, fontSize, themed } from '@atlaskit/theme';
import theme from './theme';

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

const getBorderAndPadding = ({ paddingDisabled, invalid, focused, compact, subtle, none }) => {
  let border;
  const height = compact ? heightCompact : heightBase;

  if (invalid || focused || none) border = borderWidthFocused;
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

const getDisabledState = ({ disabled }) => disabled && css`
  color: ${theme.field.disabled.text.default};
  pointer-events: none;
`;

const getHoverState = ({ appearance, readOnly, focused, none }) => {
  if (readOnly || focused || none) return null;

  return css`
    &:hover {
      background-color: ${theme.field[appearance].background.hover};
      border-color: ${theme.field[appearance].border.hover};
    }
  `;
};

const getMargin = ({ appearance, focused, paddingDisabled, readOnly }) => {
  if (
    !focused ||
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
  ${p => {
    // console.log(p);
    const thisish = themed('appearance', {
      invalid: {
        light: 'LIGHT ALIGHT A LIGHT',
        dark: 'Darkness, two which the universe shall return',
      },
    })
    // console.log(thisish);
    const something = thisish(p);
    console.log(something);
  }}
  ${p => getBorderAndPadding(p)}
  ${p => getMargin(p)}
  background-color: ${({ appearance, focused }) => theme.field[appearance].background[focused]};
  border-color: ${({ appearance, focused }) => theme.field[appearance].border[focused]};
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
