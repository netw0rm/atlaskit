/* tslint:disable:variable-name */
import styled from 'styled-components';
import Button from '@atlaskit/button';
import {marquee, size} from '../../../styles';

export const Title = styled.div`
  position: absolute;
  z-index: 1;
  white-space: nowrap;
  color: black;
  padding: 5px;
  display: flex;
  bottom: 0;
  color: white;
  text-shadow: 1px 1px black;
`;

export const Marquee = styled.div`
  animation: ${marquee} 8s linear infinite;
  animation-play-state: paused;

  &.playing {
    animation-play-state: running;
  }
`;

export const ButtonWrapper = styled(Button)`
  ${size('20px')}
  z-index: 1;
  position: absolute;
  top: 5px;
  right: 10px;
  padding: 0;
`;
