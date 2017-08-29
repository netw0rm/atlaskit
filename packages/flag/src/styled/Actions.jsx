// @flow
/* eslint-disable no-confusing-arrow */

import styled, { css } from 'styled-components';
import {
  akFontSizeDefault as fontSize,
  akGridSizeUnitless as spacing,
} from '@atlaskit/util-shared-styles';

import { borderRadius, gridSize, math } from '@atlaskit/theme';

import {
  buttonBackgroundColor,
  buttonTextColor,
  textColor,
  flagFocusRingColor,
} from '../theme';

// Outputs the styles for actions separator: mid-dot for non-bold flags, or space for bold flags.
const getDivider = ({ hasDivider, useMidDot }) => css`
  display: ${hasDivider ? 'inline-block' : 'none'};
  content: "${useMidDot ? '\u00B7' : ''}";
  width: ${useMidDot ? math.multiply(gridSize, 2) : gridSize}px;
`;

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${gridSize}px;
`;

export const Action = styled.div`
  &::before {
    color: ${textColor};
    text-align: center;
    vertical-align: middle;

    ${getDivider}
  }
`;

const height = `${(spacing * 3) / parseInt(fontSize, 10)}em`;
export const Button = styled.button`
  align-items: baseline;
  background: ${buttonBackgroundColor};
  border-radius: ${borderRadius}px;
  border-width: 0;
  box-sizing: border-box;
  color: ${buttonTextColor};
  cursor: pointer;
  display: inline-flex;
  font-size: inherit;
  font-style: normal;
  font-weight: 500;
  height: ${height};
  line-height: ${height};
  margin: 0;
  outline: 0;
  padding: 0 ${p => p.appearance === 'normal' ? 0 : gridSize(p)}px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: baseline;
  white-space: nowrap;
  width: auto;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${flagFocusRingColor};
  }

  &::-moz-focus-inner {
    border: 0;
    margin: 0;
    padding: 0;
  }
`;
