/* tslint:disable:variable-name */
import styled from 'styled-components';
import {size, centerSelf, easeInOutCubic, center} from '../../styles';

export const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 116px);
  color: white;
  width: 100%;
  cursor: pointer;

  &:hover {
    .circle {
      width: 300px;
      height: 184px;
      border-radius: 0;
    }
  }
`;

export const AnimatedButton = styled.div`
  ${centerSelf}

  svg {
    height: 40px;
  }
`;

export const Circle = styled.div`
  ${size(40)}
  ${centerSelf}
  background: rgba(23, 43, 77, 0.75);
  border-radius: 100%;
  transition: all .3s ${easeInOutCubic};
`;

export const PlayButtonIcon = styled.div`
  ${center}
  ${centerSelf}
  z-index: 10;
  pointer-events: none;
`;
