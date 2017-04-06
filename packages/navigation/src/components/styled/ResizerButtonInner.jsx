import styled from 'styled-components';
import {
  akGridSizeUnitless,
  akColorB200,
} from '@atlaskit/util-shared-styles';
import focusRingMixin from '../../utils/focus-ring-mixin';

const toggleButtonHeight = akGridSizeUnitless * 4.5;
const toggleArrowHeight = akGridSizeUnitless * 2;
const toggleArrowWidth = 2;
const toggleArrowTopVerticalOffset = (toggleButtonHeight - toggleArrowHeight) / 2;
const toggleArrowBottomVerticalOffset =
  (toggleArrowTopVerticalOffset - toggleArrowWidth) + (toggleArrowHeight / 2);
const opacityTransition = 'opacity cubic-bezier(0.15, 1, 0.3, 1) 0.3s';
const transformTransition = 'transform 0.2s ease-in-out';

const ResizerButtonInner = styled.button`
  position: relative;
  top: calc(50% - ${toggleButtonHeight / 2}px);
  height: ${toggleButtonHeight}px;
  background: none;
  border: none;
  color: transparent;
  width: ${akGridSizeUnitless * 3}px;
  left: 0;
  cursor: pointer;

  ${focusRingMixin()}

  &:before, &:after {
    content: '';
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    background: ${akColorB200};
    width: ${toggleArrowWidth}px;
    border-radius: ${toggleArrowHeight}px;
    height: ${toggleArrowHeight / 2}px;
    position: absolute;
    left: 13px;
    transition: ${transformTransition}, ${opacityTransition};
    transform: rotate(0deg);
  }

  &:before {
    top: ${toggleArrowTopVerticalOffset}px;
    transform-origin: ${toggleArrowWidth / 2}px ${(toggleArrowHeight / 2) - (toggleArrowWidth / 2)}px;
  }

  &:after {
    top: ${toggleArrowBottomVerticalOffset}px;
    transform-origin: ${toggleArrowWidth / 2}px ${toggleArrowWidth / 2}px;
  }

  &:hover, &:focus {
    &:before, &:after {
      opacity: 1;
    }
    &:before {
      transform: rotate(${({ isPointingRight }) => (isPointingRight ? '-40deg' : '40deg')});
    }
    &:after {
      transform: rotate(${({ isPointingRight }) => (isPointingRight ? '40deg' : '-40deg')});
    }
  }
`;

ResizerButtonInner.displayName = 'ResizerButtonInner';
export default ResizerButtonInner;
