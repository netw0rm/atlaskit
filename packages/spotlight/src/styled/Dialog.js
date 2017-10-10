import styled, { css } from 'styled-components';
import { borderRadius, colors, gridSize, layers, math, themed } from '@atlaskit/theme';

export const DIALOG_WIDTH = {
  small: 400,
  medium: 600,
};
const gutter = 60;
const dialogWidth = p => {
  const widthValue = DIALOG_WIDTH[p.size] || p.size;
  return css`${widthValue}px`;
};

const backgroundColor = props => (props.appearance === 'help'
  ? colors.P300
  : themed({
    light: colors.N0,
    dark: colors.DN50,
  })
);
const textColor = props => (props.appearance === 'help'
  ? colors.N0
  : colors.text
);
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
  margin: ${gutter}px auto;
  position: relative;
  width: ${dialogWidth};
  z-index: ${layers.spotlight};
`;

export const Dialog = styled.div`
  background: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${getBoxShadow};
  box-sizing: border-box;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  width: ${dialogWidth};
  z-index: ${layers.spotlight};
`;
export const DialogBody = styled.div`
  flex: 1 1 auto;
  padding: ${math.multiply(gridSize, 2)}px ${math.multiply(gridSize, 3)}px;
`;
