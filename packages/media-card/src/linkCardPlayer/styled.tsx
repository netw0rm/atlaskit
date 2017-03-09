/* tslint:disable:variable-name */
import styled from 'styled-components';
import {size, centerSelf, easeInOutCubic, rgba} from '../styles/base';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 3px;
  overflow: hidden;

  &.is-played {
    height: 300px;

    .square-img {
      display: none;
    }
  }

  iframe {
    ${size('100%')}
    border: 0;
  }
`;

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

    span {
      border-color: white;
    }
  }

  > span {
    ${size(40)}
    ${centerSelf()}
    margin-left: 1px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 100%;
    transition: all .3s;

    &:hover {
      color: ${rgba('#ffffff', 0.5)};
      box-shadow: 0px 0px 14px -1px black inset;
    }
  }
`;

export const Circle = styled.div`
  ${size(40)}
  ${centerSelf()}
  background: rgba(23, 43, 77, 0.75);
  border-radius: 100%;
  transition: all .3s ${easeInOutCubic};
`;
