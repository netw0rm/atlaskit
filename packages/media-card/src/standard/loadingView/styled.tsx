/* tslint:disable:variable-name */
import styled, {keyframes} from 'styled-components';
import {center, size} from '../../styles';

export const blinkLoadingAnimation = keyframes`
  0%{
    opacity: 1;
  }

  50%{
    opacity: 0.6;
  }

  100%{
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  ${center}
  ${size()}
  color: #cfd4db;
  > span {
    animation: ${blinkLoadingAnimation} .8s infinite;
  }
`;
