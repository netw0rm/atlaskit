import styled, { css, keyframes } from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

// Dialog

export const DIALOG_WIDTH = {
  small: 400,
  medium: 600,
  large: 800,
  'x-large': 968,
};
const gutter = 60;
const maxDimensions = css`calc(100% - ${gutter * 2}px)`;
const dialogWidth = ({ widthName, widthValue }) => {
  if (typeof widthValue === 'number') {
    return `${widthValue}px`;
  }

  return widthName
    ? `${DIALOG_WIDTH[widthName]}px`
    : widthValue || 'auto';
};

const backgroundColor = themed({
  light: colors.N0,
  dark: colors.DN50,
});
const borderColor = themed({
  light: colors.N60A,
  dark: colors.DN60A,
});
const shadowColor = themed({
  light: colors.N50A,
  dark: colors.DN50A,
});

const getBoxShadow = props => {
  const border = `0 0 1px ${borderColor(props)}`;
  const shadow = `0 4px 8px -2px ${shadowColor(props)}`;

  return [border, shadow].join(',');
};

export const FillScreen = styled.div`
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: ${p => p.scrollDistance}px;
  width: 100%;
`;

export const DialogPositioner = styled.div`
  display: flex;
  flex-direction: column;
  height: ${maxDimensions};
  left: 0;
  margin-left: auto;
  margin-right: auto;
  max-height: calc(100% - 1px);
  max-width: ${maxDimensions};
  position: absolute;
  right: 0;
  top: ${gutter}px;
  width: ${dialogWidth};
`;

export const Dialog = styled.div`
  background: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${getBoxShadow};
  box-sizing: border-box;
  color: ${colors.text};
  max-height: ${math.multiply(gridSize, 60)}px;
  max-width: ${math.multiply(gridSize, 62)}px;
  padding: ${math.multiply(gridSize, 2)}px ${math.multiply(gridSize, 3)}px;
  z-index: 501;
`;

// Pulse
// rgba from colors.P400

const pulse = keyframes`
  0%, 10% { box-shadow: 0 0 0 rgba(82, 67, 170, 0.9) }
  90%, 100% { box-shadow: 0 0 1px 6px rgba(82, 67, 170, 0.1) }
`;

export const Div = styled.div`
  line-height: 1;
  position: absolute;
  z-index: 501;
`;

export const Pulse = styled(Div)`
  animation: ${pulse} 1600ms linear infinite;
  border-radius: 4px;
`;
