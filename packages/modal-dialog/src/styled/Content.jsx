import styled from 'styled-components';
import { colors, gridSize, math } from '@atlaskit/theme';
import { modalShadowInnerSize } from '../shared-variables';

// Wrapper
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Header/Footer
const HeaderOrFooter = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: ${math.multiply(gridSize, 2)}px;
`;
export const Header = HeaderOrFooter;
export const Footer = HeaderOrFooter;

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
const keylinePosition = (props) => {
  const { headerOrFooter } = props;
  if (headerOrFooter === 'header') {
    return `
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    `;
  } else if (headerOrFooter === 'footer') {
    return `margin: 0 -${math.multiply(gridSize, 2)(props)}px;`;
  }

  return null;
};

export const KeylineMask = styled.div`
  ${keylinePosition}
  background: ${colors.background};
  display: block;
  height: ${modalShadowInnerSize}px;
`;

// Body

const shadow = (invert) => (
  `inset 0 ${modalShadowInnerSize * (invert ? -1 : 1)}px 0 0 ${colors.N30}`
);

const bodyShadow = ({ hasHeader, hasFooter }) => {
  if (hasHeader && hasFooter) {
    return `${shadow()}, ${shadow(true)}`;
  } else if (hasHeader) {
    return shadow();
  } else if (hasFooter) {
    return shadow(true);
  }

  return 'none';
};

// Body

export const Body = styled.div`
  box-shadow: ${bodyShadow};
  flex: 0 1 auto;
  overflow-y: auto;
  padding: 0 ${math.multiply(gridSize, 2)}px;
  position: relative;
`;

// Focus management

export const TabLoopTerminal = styled.span`
  background: 0;
  border: 0;
  clip-path: inset(1px);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  outline: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  text-align: left;
  white-space: nowrap;
  width: 1px;
`;

TabLoopTerminal.defaultProps = { tabIndex: 0 };
