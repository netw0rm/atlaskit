/* tslint:disable:variable-name */
import styled, { keyframes } from 'styled-components';

const easeInOutCubic = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
const fadeInKeyframe = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

export const fadeIn = `
  animation: ${fadeInKeyframe} .3s ${easeInOutCubic} forwards
`;

export const MainWrapper = styled.div`
  ${fadeIn};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #1b2638;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

  &:hover {
    .visible-on-hover {
      opacity: 1;
    }
  }

  .visible-on-hover {
    opacity: 0;
    transition: opacity .3s;
  }
`;
