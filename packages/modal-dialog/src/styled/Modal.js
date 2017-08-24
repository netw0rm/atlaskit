import styled, { css } from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';
import { WIDTH_ENUM } from '../shared-variables';

// NOTE: `dialogBgColor` is consumed but `./Content` for the keyline mask
export const dialogBgColor = themed({ light: colors.N0, dark: colors.DN50 });
const overlayBgColor = themed({ light: colors.N100A, dark: colors.DN90A });

const gutter = 60;
const viewportLessGutter = css`calc(100% - ${math.multiply(gridSize, 14)}px)`;
const boxShadow = `0 0 0 1px ${colors.N30A}, 0 2px 1px ${colors.N30A}, 0 0 20px -6px ${colors.N60A}`;
const fillViewportMixin = css`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const dialogWidth = ({ widthValue }) => (widthValue
  ? `${WIDTH_ENUM.widths[widthValue]}px`
  : 'initial'
);
export const dialogHeight = ({ heightValue }) => {
  if (typeof heightValue === 'number') {
    return `${heightValue}px`;
  }

  return heightValue;
};

// NOTE: z-index temporarily added to beat @atlaskit/navigation
export const FillScreen = styled.div`
  ${fillViewportMixin}
  padding-bottom: ${gutter}px;
  padding-top: ${gutter}px;
  z-index: 300;
`;

export const DialogPositioner = styled.div`
  display: flex;
  flex-direction: column;
  height: ${dialogHeight};
  margin: 0 auto;
  max-height: 100%;
  max-width: ${viewportLessGutter};
  position: relative;
  width: ${dialogWidth};
`;

export const Dialog = styled.div`
  background-color: ${dialogBgColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${boxShadow};
  color: ${colors.text}
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100%;
  outline: 0;
  position: relative;
`;

export const Overlay = styled.div`
  ${fillViewportMixin}
  background-color: ${overlayBgColor};
`;
FillScreen.displayName = 'FillScreen';
DialogPositioner.displayName = 'DialogPositioner';
Dialog.displayName = 'Dialog';
Overlay.displayName = 'Overlay';
