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
const spacingDivision = {
  comfortable: 2,
  cozy: 4,
  compact: 8,
};

const getDimensions = ({ size, spacing }) => {
  const val = sizes[size];
  const margin = val / spacingDivision[spacing];
  const hitslop = val + (margin * 2);

  return css`
    height: ${val}px;
    margin-left: ${margin}px;
    margin-right: ${margin}px;
    position: relative;
    width: ${val}px;

    &::before {
      content: "";
      display: block;
      height: ${hitslop}px;
      left: -${margin}px;
      position: absolute;
      top: -${margin}px;
      width: ${hitslop}px;
    }
  `;
};
const getColor = ({ appearance, selected }) => (
  selected
    ? selectedColorMap[appearance]
    : colorMap[appearance]
);
const commonRules = css`
  ${getDimensions}
  background-color: ${getColor};
  border-radius: 50%;
`;

export const Container = styled.div`
  justify-content: center;
  display: flex;
`;

export const IndicatorButton = styled.button`
  ${commonRules}
  border: 0;
  cursor: pointer;
  padding: 0;
`;
export const IndicatorDiv = styled.div`
  ${commonRules}
`;
