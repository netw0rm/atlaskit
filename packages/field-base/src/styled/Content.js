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

const getDisabledColor = themed({ light: colors.N60, dark: colors.DN90 });

const getDisabledState = (props) => props.disabled && css`
  color: ${getDisabledColor(props)};
  pointer-events: none;
`;

const getHoverState = (props) => {
  if (props.readOnly || props.isFocused || props.none) return null;

  return css`
    &:hover {
      background-color: ${getBackgroundColorHover(props)};
      border-color: ${getBorderColorHover(props)};
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

const getColor = themed({ light: colors.N900, dark: colors.DN600 });
const getBorderStyle = props => (props.appearance === 'none' ? 'none' : 'solid');

export const Content = styled.div`
  color: ${getColor};
  background-color: ${props => (props.isFocused ? getBackgroundColorFocus(props) : getBackgroundColor(props))};
  border-color: ${props => (props.isFocused ? getBorderColorFocus(props) : getBorderColor(props))};
  border-radius: ${borderRadius};
  border-style: ${getBorderStyle};
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
  ${getBorderAndPadding}
  ${getMargin}
  ${getHoverState}
  ${getDisabledState}
`;

export const ContentWrapper = styled.div`
  ${props => (props.disabled && 'cursor: not-allowed;')}
  ${props => (props.grow && 'flex: 1 1 auto;')};
  align-items: center;
  display: flex;
  max-width: 100%;
`;
