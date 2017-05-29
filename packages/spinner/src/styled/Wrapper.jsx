import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export default styled.div`
  animation: ${spin} 0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
  display: inline-flex;
`;
