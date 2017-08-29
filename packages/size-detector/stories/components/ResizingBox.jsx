import styled, { keyframes } from 'styled-components';

const startSize = 100;
const endSize = startSize * 2;

const growAndShrink = keyframes`
  0% {
    width: ${startSize}px;
    height: ${startSize}px;
  }

  50% {
    width: ${endSize}px;
    height: ${endSize}px;
  }

  100% {
    width: ${startSize}px;
    height: ${startSize}px;
  }
`;

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #CCC;
  color: #333;
  animation: ${growAndShrink} 3s ease-in-out infinite;
  width: ${startSize}px;
  height: ${startSize}px;
`;
