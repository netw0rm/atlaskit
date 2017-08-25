/* tslint:disable: variable-name */
import styled, { keyframes } from 'styled-components';

export const blinkLoadingAnimation = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  color: #cfd4db;
  animation: ${blinkLoadingAnimation} .8s infinite;
`;
