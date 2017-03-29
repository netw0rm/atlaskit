import styled from 'styled-components';
import { akColorN500 } from '@atlaskit/util-shared-styles';

const getOpacity = ({ active }) => (active ? 1 : 0);
const getTransitionDelay = ({ active }) => (active ? 'initial' : '0.45s');

export default styled.circle`
  opacity: ${getOpacity};
  stroke: ${akColorN500};
  transform-origin: center;
  transition: stroke-dashoffset 0.8s ease-in-out, opacity 0.2s ease-in-out;
  transition-delay: ${getTransitionDelay};
`;
