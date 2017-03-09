/* tslint:disable:variable-name */
import styled from 'styled-components';
import {size} from '../styles/base';

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
    > span {
      width: 300px;
      height: 184px;
      border-radius: 0;
    }
  }

  > span {
    position: absolute;
    top: 50%;
    left: 50%
    transform: translate(-50%, -50%);
    background: rgba(23, 43, 77, 0.75);
    border-radius: 100%;
    width: 40px;
    height: 40px;
    transition: all .3s;
  }
`;
