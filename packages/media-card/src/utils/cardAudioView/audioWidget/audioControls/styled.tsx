/* tslint:disable:variable-name */
import styled from 'styled-components';
import { centerSelf, easeOutCubic } from '../../../../styles';

export const PlayButtonWrapper = styled.div`
  ${centerSelf}
  color: #4c5b76;
  height: 48px;
  cursor: pointer;
  transition: all .5s ${easeOutCubic};
  opacity: .8;

  // TODO set a legit value here
  z-index: 99999;

  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

export const PlayCanvas = styled.canvas`
  ${centerSelf}
  transform: translate(-50%, -50%) rotate(270deg);
  width: 100%;
  z-index: 1;
  opacity: .8;
`;
