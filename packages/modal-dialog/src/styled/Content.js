import styled, { css } from 'styled-components';
import { colors, gridSize, math, themed } from '@atlaskit/theme';

// Constants
// ==============================
const innerGutter = 16;
const outerGutter = 20;
const keylineColor = themed({ light: colors.N30, dark: colors.DN30 });
export const keylineHeight = 2;
const bodyPadding = ({ isChromeless }) => (
  isChromeless ? '0' : `${keylineHeight}px ${outerGutter}px`
);

// Wrapper
// ==============================
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  max-height: 100%;
`;

// Header
// ==============================
const HeaderOrFooter = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 200ms;
`;
export const Header = styled(HeaderOrFooter)`
  padding: ${outerGutter}px ${outerGutter}px ${innerGutter - keylineHeight}px;
  box-shadow: ${p => (p.showKeyline
    ? css`0 ${keylineHeight}px 0 0 ${keylineColor}`
    : 'none'
  )};
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
  danger: colors.R400,
  warning: colors.Y400,
};
export const TitleIconWrapper = styled.span`
  color: ${p => iconColor[p.appearance]};
  margin-right: ${gridSize}px;
`;

// Body
// ==============================

/**
  Adding the padding here avoids cropping box shadow on first/last
  children. The combined vertical spacing is maintained by subtracting the
  keyline height from header and footer.
*/
export const Body = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: ${bodyPadding};
`;

// Footer
// ==============================
export const Footer = styled(HeaderOrFooter)`
  padding: ${innerGutter - keylineHeight}px ${outerGutter}px ${outerGutter}px;
  box-shadow: ${p => (p.showKeyline
    ? css`0 -${keylineHeight}px 0 0 ${keylineColor}`
    : 'none'
  )};
`;

export const Actions = styled.div`
  display: inline-flex;
  margin: 0 -${math.divide(gridSize, 2)}px;
`;
export const ActionItem = styled.div`
  flex: 1 0 auto;
  margin: 0 ${math.divide(gridSize, 2)}px;
`;
