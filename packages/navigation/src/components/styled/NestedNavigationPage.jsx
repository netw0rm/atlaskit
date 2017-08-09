// @flow
import styled, { keyframes } from 'styled-components';
import { animationTimeUnitless } from '../../shared-variables';

const animationTime = animationTimeUnitless / 1000;

export const getAnimation = ({ isEntering, isLeaving, traversalDirection }) => (
  (isEntering || isLeaving) ? (
    `animation: ${animationTime}s ${keyframes`
      from { transform: translateX(${traversalDirection === 'down' ? 100 : -100}%); }
      to { transform: translateX(0); }
    `};`
  ) : (
    null
  )
);

const NestedNavigationPage = styled.div`
  ${getAnimation}
  flex-shrink: 0;
  width: 100%;

  /* as a flex child - take up the full height */
  flex-grow: 1;

  /* create a new flex container to take up the full height */
  display: flex;
  flex-direction: column;
`;

NestedNavigationPage.displayName = 'NestedNavigationPage';

export default NestedNavigationPage;
