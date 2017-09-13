import styled, { css, keyframes } from 'styled-components';

// Pulse: rgb from colors.P300

const pulseKeframes = keyframes`
  0%, 33% { box-shadow: 0 0 0 rgba(101, 84, 192, 1) }
  66%, 100% { box-shadow: 0 0 1px 12px rgba(101, 84, 192, 0.01) }
`;
const animation = css`animation: ${pulseKeframes} 3000ms ease-out infinite;`;
const animationWithCheck = ({ pulse }) => (pulse ? animation : null);

const backgroundColor = p => (p.bgColor
  ? css`background-color: ${p.bgColor};`
  : null
);
const borderRadius = p => (p.radius
  ? css`border-radius: ${p.radius}px;`
  : null
);

export const Target = styled.div`
  ${animationWithCheck}
  ${backgroundColor}
  ${borderRadius}
  line-height: 1;
  position: absolute;
  z-index: 501;
`;

export const ClickTarget = styled.div`
  ${borderRadius}
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
  ${borderRadius}
  line-height: 1;
  position: absolute;
  z-index: 501;
`;
