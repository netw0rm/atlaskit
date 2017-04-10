import styled from 'styled-components';
import {
  akAnimationMixins,
  akColorN900,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

// common constants
const grid = akGridSizeUnitless / 2;
const fontSize = 3 * grid;

// animation constants
const animDistance = 3 * grid;
const animDelay = 0.1;
const animTime = animDelay + 1;

// properties to animate
const slideUp = ['transform', 'translateY(XXpx)', animDistance, 0];
const slideDown = ['transform', 'translateY(XXpx)', -animDistance, 0];
const slideLeft = ['transform', 'translateX(XXpx)', animDistance, 0];
const slideRight = ['transform', 'translateX(XXpx)', -animDistance, 0];
const fadeIn = ['opacity', 'XX', 0, 1];

// positioning maps to create keyframes
const KEYFRAMES = {
  bottom: akAnimationMixins.createBold([slideDown, fadeIn]),
  left: akAnimationMixins.createBold([slideLeft, fadeIn]),
  right: akAnimationMixins.createBold([slideRight, fadeIn]),
  top: akAnimationMixins.createBold([slideUp, fadeIn]),
};
const KEYFRAMES_FLIPPED = {
  bottom: KEYFRAMES.top,
  left: KEYFRAMES.right,
  right: KEYFRAMES.left,
  top: KEYFRAMES.bottom,
};
const getKeyframeName = ({ isFlipped, position }) => (isFlipped
  ? KEYFRAMES_FLIPPED[position]
  : KEYFRAMES[position]
);

// apply all the things
export default styled.div`
  animation: ${getKeyframeName} ${animTime}s ${animDelay}s backwards;
  background-color: ${akColorN900};
  border-radius: 3px;
  box-sizing: border-box;
  color: white;
  font-size: ${fontSize}px;
  line-height: ${(4 * grid) / (fontSize)};
  margin: ${2 * grid}px;
  max-width: ${105 * grid}px;
  padding: ${grid / 2}px ${2 * grid}px;
  pointer-events: none;
  white-space: nowrap;
`;
