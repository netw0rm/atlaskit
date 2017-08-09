import styled, { css } from 'styled-components';
import { colors, gridSize, fontSize as defaultFontSize, math } from '@atlaskit/theme';

// Math Helper
const heading = (fontSize, lineHeight) => css`
  font-size: ${math.divide(fontSize, defaultFontSize)}em;
  font-style: inherit;
  line-height: ${lineHeight / fontSize};
`;

// ADG Heading Styles
const h900 = css`
  ${heading(35, 40)}
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-top: ${math.multiply(gridSize, 6.5)}px;
`;

const h800 = css`
  ${heading(29, 32)}
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-top: ${math.multiply(gridSize, 5)}px;
`;

const h700 = css`
  ${heading(24, 28)}
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-top: ${math.multiply(gridSize, 5)}px;
`;

const h600 = css`
  ${heading(20, 24)}
  font-weight: 500;
  letter-spacing: -0.008em;
  margin-top: ${math.multiply(gridSize, 3.5)}px;
`;

const h500 = css`
  ${heading(16, 20)}
  font-weight: 600;
  letter-spacing: -0.006em;
  margin-top: ${math.multiply(gridSize, 3)}px;
`;

const h400 = css`
  ${heading(14, 16)}
  font-weight: 600;
  letter-spacing: -0.003em;
  margin-top: ${math.multiply(gridSize, 2)}px;
`;

const h300 = css`
  ${heading(12, 16)}
  color: ${colors.subtleHeading};
  font-weight: 600;
  margin-top: ${math.multiply(gridSize, 2.5)}px;
  text-transform: uppercase;
`;

const h200 = css`
  ${heading(12, 16)}
  color: ${colors.subtleHeading};
  font-weight: 600;
  margin-top: ${math.multiply(gridSize, 2)}px;
`;

const h100 = css`
  ${heading(12, 16)}
  color: ${colors.subtleHeading};
  font-weight: normal;
  margin-top: ${math.multiply(gridSize, 2)}px;
`;

// ADG headings available as mixins
export const headings = { h100, h200, h300, h400, h500, h600, h700, h800, h900 };

// Common headings available as components
export const H1 = styled.h1`${h800}`;
export const H2 = styled.h2`${h700}`;
export const H3 = styled.h3`${h600}`;
export const H4 = styled.h4`${h500}`;
export const H5 = styled.h5`${h400}`;
export const H6 = styled.h6`${h300}`;
