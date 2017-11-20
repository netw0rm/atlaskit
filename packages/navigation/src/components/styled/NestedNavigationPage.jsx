// @flow
import styled, { keyframes } from 'styled-components';
import { animationTimeUnitless } from '../../shared-variables';
import ScrollHintScrollContainer from '../styled/ScrollHintScrollContainer';

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

// Use the same scrollbar styling as the main container navigation
const NestedNavigationPage = styled(ScrollHintScrollContainer)`
  ${getAnimation}
  flex-shrink: 0;
  /* we want each page to have internal scrolling */
  overflow-y: auto;
`;

NestedNavigationPage.displayName = 'NestedNavigationPage';

export default NestedNavigationPage;
