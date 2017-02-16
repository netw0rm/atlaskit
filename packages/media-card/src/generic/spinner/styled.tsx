/* tslint:disable:variable-name */
import styled, { keyframes } from 'styled-components';

const l8 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinnerLoad2 = keyframes`
  0% {
    transform: rotate(50deg);
  }
  100% {
    transform: rotate(230deg);
  }
`;

const spinnerLoad = keyframes`
  0% {
    transform: rotate(230deg);
  }
  100% {
    transform: rotate(510deg);
  }
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  z-index: 20;
  pointer-events: none;

  animation: ${spinnerLoad} 0.53s ease-in-out;
  animation-fill-mode: forwards;

  svg {
    display: block;
  }

  .path-animate {
    stroke-dasharray: 60;
    transform-origin: center;
    stroke: #42526e;

    stroke-dashoffset: 60;
    animation: ${l8} 0.86s infinite;
    animation-timing-function: cubic-bezier(0.4, 0.15, 0.6, 0.85);
    transition: stroke-dashoffset 0.8s ease-in-out, opacity 0.2s ease-in-out 0.45s;
    opacity: 0;
  }

  &.active {
    animation: ${spinnerLoad2} 1s ease-in-out;
    animation-fill-mode: forwards;

    .path-animate {
      stroke-dashoffset: 50;
      opacity: 1;
      transition: stroke-dashoffset 0.8s ease-in-out, opacity 0.2s ease-in-out;
    }
  }
`;

export default SpinnerWrapper;
