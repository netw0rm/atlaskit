import styled, { css } from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';
import { WIDTH_ENUM } from '../shared-variables';

export const dialogBgColor = themed({ light: colors.N0, dark: colors.DN50 });
const gutter = math.multiply(gridSize, 7);
const viewportLessGutter = css`calc(100% - ${math.multiply(gridSize, 14)}px)`;
const boxShadow = `0 0 0 1px ${colors.N30A}, 0 2px 1px ${colors.N30A}, 0 0 20px -6px ${colors.N60A}`;
const fill = css`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const dialogWidth = ({ width }) => `${WIDTH_ENUM.widths[width]}px`;
export const dialogHeight = ({ height }) => {
  if (typeof height === 'number') {
    return `${height}px`;
  } else if (typeof height === 'string') {
    return height;
  }

  return viewportLessGutter;
};

export const FillScreen = styled.div`
  ${fill}
`;

export const DialogPositioner = styled.div`
  display: flex;
  flex-direction: column;
  height: ${dialogHeight};
  margin: 0 auto;
  margin-top: ${gutter}px;
  max-height: calc(100% - 1px);
  max-width: ${viewportLessGutter};
  position: relative;
  width: ${dialogWidth};
`;

export const Dialog = styled.div`
  background-color: ${dialogBgColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${boxShadow};
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100%;
  outline: 0;
  position: relative;
`;

export const Overlay = styled.div`
  ${fill}
  background-color: ${colors.N100A};
`;
FillScreen.displayName = 'FillScreen';
DialogPositioner.displayName = 'DialogPositioner';
Dialog.displayName = 'Dialog';
Overlay.displayName = 'Overlay';
