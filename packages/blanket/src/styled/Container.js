import styled from 'styled-components';
import { akColorN900, akZIndexBlanket } from '@atlaskit/util-shared-styles';

export const getOpacity = ({ isTinted }) => (isTinted ? 0.5 : 0);
export const getPointerEvents = ({ canClickThrough }) => (canClickThrough
  ? 'none'
  : 'initial'
);

const ThemeColor = {
  background: akColorN900,
};

export default styled.div`
  background: ${ThemeColor.background};
  bottom: 0;
  left: 0;
  opacity: ${getOpacity};
  pointer-events: ${getPointerEvents};
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 220ms;
  z-index: ${akZIndexBlanket};
`;
