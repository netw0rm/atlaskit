import styled, { keyframes } from 'styled-components';

const spinnerLoad = keyframes`
  from { transform: rotate(230deg); }
  to { transform: rotate(510deg); }
`;
const spinnerLoadActive = keyframes`
  from { transform: rotate(50deg); }
  to { transform: rotate(230deg); }
`;

const getOpacity = ({ hidden }) => (hidden ? 0 : 1);
const getAnimation = ({ active }) => (active
  ? `${spinnerLoadActive} 1s`
  : `${spinnerLoad} 0.53s`
);

export default styled.div`
  animation: ${getAnimation} ease-in-out forwards;
  display: inline-flex;
  opacity: ${getOpacity};
`;
