// @flow
import styled, { keyframes } from 'styled-components';
import { animationTimeUnitless } from '../../shared-variables';

const animationTime = animationTimeUnitless / 1000;

export const getAnimation = ({ isEntering, isLeaving, traversalDirection }: Object) => (
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
  display: flex;
  /* all pages should take up 100% of the container width */
  flex-basis: 100%;
  flex-direction: column;
  /* take up the full height - desirable when using drag-and-drop in nested nav */
  flex-grow: 1;
  flex-shrink: 0;
  /* we want each page to have internal scrolling */
  overflow-y: auto;
`;

NestedNavigationPage.displayName = 'NestedNavigationPage';

export default NestedNavigationPage;
