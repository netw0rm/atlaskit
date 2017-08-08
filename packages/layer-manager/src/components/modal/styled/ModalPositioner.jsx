import styled, { keyframes } from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { WIDTH_ENUM, modalAnimationDuration } from '../shared-variables';

const animationDistance = akGridSizeUnitless * -2;

const getWidth = ({ width }) => WIDTH_ENUM.widths[width];

// ModalPositioner gets the isOpen prop from the root Modal component, and when this prop changes
// we fire the appropriate entry or exit animation.
// TODO: replace with styled-components animation mixin from util-shared-styles when available.
const getEntryExitAnimation = ({ isOpen }) => {
  const topFrom = isOpen ?
    animationDistance : 0;
  const topMid = isOpen ?
    akGridSizeUnitless * 0.5 : animationDistance * 0.6;
  const topEnd = isOpen ?
    0 : animationDistance;

  const opacityFrom = isOpen ? 0 : 1;
  const opacityMid = isOpen ? 0.8 : 0.2;
  const opacityTo = isOpen ? 1 : 0;

  return keyframes`
    0% {
      opacity: ${opacityFrom};
      top: ${topFrom}px;
    }

    50% {
      opacity: ${opacityMid};
      top: ${topMid}px;
    }

    100% {
      opacity: ${opacityTo};
      top: ${topEnd}px;
    }
  `;
};

// have to use height because of IE11 bug
// The -1px in max-height is needed for IE11/Edge.
export default styled.div`
  width: ${getWidth}px;

  animation: ${getEntryExitAnimation} ${modalAnimationDuration}s ease-in-out;
`;
