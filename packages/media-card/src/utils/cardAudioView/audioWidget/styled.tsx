/* tslint:disable:variable-name */
import {marquee} from '../../../styles';
import styled from 'styled-components';

export const Title = styled.div`
  position: absolute;
  z-index: 1;
  white-space: nowrap;
  color: black;
  padding: 5px;
  display: flex;
`;

export const Marquee = styled.div`
  animation: ${marquee} 8s linear infinite;
  animation-play-state: paused;

  &.playing {
    animation-play-state: running;
  }
`;
