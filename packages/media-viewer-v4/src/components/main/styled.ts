/* tslint:disable:variable-name */
import styled, { keyframes } from 'styled-components';
import * as style from '@atlaskit/util-shared-styles';

const fadeInKeyframe = keyframes`
  0%{
    opacity: 0;
    transform: scale(0);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
`;

export const fadeIn = `
  animation: ${fadeInKeyframe} .5s forwards
`;

export interface MainWrapperProps {
  openerOrigin?: string;
}

export const Wrapper = styled.div`
  ${fadeIn};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${style.akColorN900};
  overflow: hidden;
  z-index: 9;

  ${({openerOrigin}: MainWrapperProps) => openerOrigin && `
    transform-origin: ${openerOrigin};
  ` || ''}

  * {
    box-sizing: border-box;
  }

  &:hover {
    .visible-on-hover {
      opacity: 1;
    }
  }

  .visible-on-hover {
    z-index: 1;
    /* opacity: 0;*/
    transition: opacity .3s;
  }
`;

export const ViewerWrapper = styled.div`
  flex: 1;
  padding: 10px;
  overflow: hidden;
`;
