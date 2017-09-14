import styled, { css } from 'styled-components';
import { borderRadius, colors, themed } from '@atlaskit/theme';
import { WIDTH_ENUM } from '../shared-variables';

const boxShadow = `
  0 0 0 1px ${colors.N30A}, 0 2px 1px ${colors.N30A},
  0 0 20px -6px ${colors.N60A}
`;
const dialogBgColor = themed({ light: colors.N0, dark: colors.DN50 });
const gutter = 60;
const maxDimensions = css`calc(100% - ${gutter * 2}px)`;

export const dialogWidth = ({ widthName, widthValue }) => {
  if (typeof widthValue === 'number') {
    return `${widthValue}px`;
  }

  return widthName
    ? `${WIDTH_ENUM.widths[widthName]}px`
    : widthValue || 'auto';
};
export const dialogHeight = ({ heightValue }) => {
  if (typeof heightValue === 'number') {
    return `${heightValue}px`;
  }

  return heightValue || 'auto';
};

/**
  NOTE:
  z-index
  - temporarily added to beat @atlaskit/navigation

  absolute + top
  - rather than fixed position so popper.js children are properly positioned

  overflow-y
  - only active when popper.js children envoked below the dialog
*/
export const FillScreen = styled.div`
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: ${p => p.scrollDistance}px;
  width: 100%;
  z-index: 300;
`;

export const Positioner = styled.div`
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
  background-color: ${dialogBgColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${boxShadow};
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  height: ${dialogHeight};
  max-height: 100%;
  outline: 0;
`;

FillScreen.displayName = 'FillScreen';
Positioner.displayName = 'Positioner';
Dialog.displayName = 'Dialog';
