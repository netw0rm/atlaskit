import styled, { css, keyframes } from 'styled-components';

// Pulse: rgb from colors.P300

const pulseKeframes = keyframes`
  0%, 10% { box-shadow: 0 0 0 rgba(101, 84, 192, 0.9) }
  90%, 100% { box-shadow: 0 0 1px 6px rgba(101, 84, 192, 0.1) }
`;
const animation = css`animation: ${pulseKeframes} 1600ms linear infinite;`;
const animationWithCheck = ({ pulse }) => (pulse ? animation : null);

export const Target = styled.div`
  ${animationWithCheck}
  border-radius: ${p => p.radius || 0}px;
  line-height: 1;
  position: absolute;
  z-index: 501;
`;

export const ClickTarget = styled.div`
  border-radius: ${p => p.radius || 0}px;
  cursor: ${p => (p.onClick ? 'pointer' : 'auto')};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

// exported for consumer
export const Pulse = styled.div`
  ${animation}
  border-radius: ${p => p.radius || 0}px;
  line-height: 1;
  position: absolute;
  z-index: 501;
`;
