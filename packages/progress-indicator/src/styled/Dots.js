import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';

const colorMap = {
  default: themed({ light: colors.N50, dark: colors.DN70 }),
  help: themed({ light: colors.P75, dark: colors.DN70 }),
  inverted: themed({ light: 'rgba(255, 255, 255, 0.4)', dark: colors.DN300A }),
  primary: themed({ light: colors.B75, dark: colors.DN70 }),
};
const selectedColorMap = {
  default: themed({ light: colors.N900, dark: colors.DN600 }),
  help: themed({ light: colors.P400, dark: colors.P200 }),
  inverted: themed({ light: colors.N0, dark: colors.DN30 }),
  primary: themed({ light: colors.B400, dark: colors.B100 }),
};
const sizes = {
  small: 4,
  default: 8,
  large: 12,
};

const getDimensions = ({ size }) => {
  const val = sizes[size];
  const margin = val / 4;

  return css`
    margin-left: ${margin}px;
    margin-right: ${margin}px;
    height: ${val}px;
    width: ${val}px;
  `;
};
const getColor = ({ appearance, selected }) => (
  selected
    ? selectedColorMap[appearance]
    : colorMap[appearance]
);

export const Container = styled.div`
  justify-content: center;
  display: flex;
`;

export const IndicatorButton = styled.button`
  ${getDimensions}
  background-color: ${getColor};
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
`;
export const IndicatorDiv = styled.div`
  ${getDimensions}
  background-color: ${getColor};
  border-radius: 50%;
`;
