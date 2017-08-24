import styled, { css } from 'styled-components';
import { colors, gridSize, themed } from '@atlaskit/theme';
import { modalShadowInnerSize } from '../shared-variables';
import { dialogBgColor } from './Modal';

// Constants
// ==============================
const innerGutter = 16;
const outerGutter = 20;

// Wrapper
// ==============================
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Header
// ==============================
const HeaderOrFooter = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
`;
export const Header = styled(HeaderOrFooter)`
  padding: ${outerGutter}px ${outerGutter}px ${innerGutter}px;
`;

// Title
export const Title = styled.h4`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1;
  margin: 0;
`;
const iconColor = {
  error: colors.R400,
  warning: colors.Y400,
};
export const TitleIcon = styled.span`
  color: ${p => iconColor[p.appearance]}
  margin-right: ${gridSize}px;
`;

// Keyline mask for the header/footer
// ==============================
const keylinePosition = (props) => {
  const { position } = props;
  if (position === 'header') {
    return `
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    `;
  } else if (position === 'footer') {
    return `margin: 0 -${outerGutter}px;`;
  }

  return null;
};

export const KeylineMask = styled.div`
  ${keylinePosition}
  border-top: ${modalShadowInnerSize}px solid ${dialogBgColor};
`;

// Body
// ==============================

const keylineColor = themed({ light: colors.N30, dark: colors.DN30 });
const bodyShadow = ({ hasHeader, hasFooter }) => {
  if (hasHeader && hasFooter) {
    return css`
      inset 0 ${modalShadowInnerSize}px 0 0 ${keylineColor},
      inset 0 -${modalShadowInnerSize}px 0 0 ${keylineColor}
      `;
  } else if (hasHeader) {
    return css`inset 0 ${modalShadowInnerSize}px 0 0 ${keylineColor}`;
  } else if (hasFooter) {
    return css`inset 0 -${modalShadowInnerSize}px 0 0 ${keylineColor}`;
  }

  return 'none';
};
export const Body = styled.div`
  box-shadow: ${bodyShadow};
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 ${outerGutter}px;
  position: relative;
`;
export const BodyInner = styled.div`
  flex: 1 0 auto;
`;

// Footer
// ==============================
export const Footer = styled(HeaderOrFooter)`
  padding: ${innerGutter}px ${outerGutter}px ${outerGutter}px;
`;

const actionGutter = 8;
export const Actions = styled.div`
  display: inline-flex;
  margin: 0 -${actionGutter / 2}px;
`;
export const ActionItem = styled.div`
  flex: 1 0 auto;
  margin: 0 ${actionGutter / 2}px;
`;
