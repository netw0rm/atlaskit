// @flow
import styled, { css } from 'styled-components';
import { akColorN40, akColorN70A, akColorN200A, akColorB200 } from '@atlaskit/util-shared-styles';
import {
  AVATAR_RADIUS,
  PRESENCE_BORDER_WIDTH,
  PRESENCE_OFFSET,
  PRESENCE_SIZES,
} from './constants';
import { getAvatarDimensions } from './utils';

// "square" avatars are explicit
const getBorderRadius = ({ size, appearance }) => (appearance === 'circle'
  ? '50%'
  : `${AVATAR_RADIUS[size]}px`
);

// =================================

// translateZ used to invoke the GPU -- otherwise overflow is ignored when animating
export function getStyles(props) {
  const isInteractive = props.href || props.onClick;
  const transitionDuration = '150ms';
  const boxSizing = 'content-box'; // fix for <buttons/>

  /**
   * Variable styles
   */
  let backgroundColor = 'transparent';
  let overlayShade = 'transparent';
  let overlayOpacity = 0;
  let borderColor = props.borderColor || 'transparent';
  let cursor = 'default';
  let outline = 'none';
  let pointerEvents = 'auto';
  let position = 'static';
  let transform = 'translateZ(0)';

  // Interaction: Hover
  if (isInteractive && (props.isActive || props.isHover)) {
    overlayShade = akColorN70A;
    overlayOpacity = 1;
  }

  // Interaction: Active
  if (isInteractive && props.isActive) {
    transform = 'scale(0.85)';
  }

  // Interaction: Focus
  if (isInteractive && props.isFocus && !props.isActive) {
    outline = 'none';
    borderColor = akColorB200;
  }

  // Disabled
  if (props.isDisabled) {
    cursor = 'not-allowed';
    overlayShade = 'rgba(255, 255, 255, 0.7)';
    overlayOpacity = 1;
    pointerEvents = 'none';
  }

  // Interactive
  if (isInteractive) {
    cursor = 'pointer';
  }

  // Loading
  if (props.isLoading) {
    backgroundColor = akColorN40;
  }

  // Loading
  if (props.isSelected) {
    overlayShade = akColorN200A;
    overlayOpacity = 1;
  }

  // Stack
  if (props.stackIndex) {
    position = 'relative';
  }

  return css`
    align-items: center;
    background-color: ${backgroundColor};
    border-color: ${borderColor}
    border-radius: ${getBorderRadius};
    border-style: solid;
    border-width: ${PRESENCE_BORDER_WIDTH[props.size]}px;
    box-sizing: ${boxSizing};
    cursor: ${cursor}
    display: flex;
    height: 100%;
    justify-content: center;
    outline: ${outline};
    overflow: hidden;
    padding: 0;
    pointer-events: ${pointerEvents};
    position: ${position}
    transform: ${transform};
    transition: border-color ${transitionDuration};
    width: 100%;

    &::after {
      background-color: ${overlayShade};
      bottom: 0;
      content: " ";
      left: 0;
      opacity: ${overlayOpacity}
      position: absolute;
      right: 0;
      top: 0;
      transition: opacity ${transitionDuration};
    }

    &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `;
}

// =================================

// MAIN CONTAINER
export default styled.div`
  ${getAvatarDimensions}
  display: inline-block;
  position: relative;
  outline: 0;
  ${p => p.stackIndex && `z-index: ${p.stackIndex};`}
`;

// IMAGE WRAPPER
export const ImageWrapper = styled.div`
  ${getStyles}
`;

// PRESENCE WRAPPER
const getPresenceLayout = ({ appearance, size }) => {
  const presencePosition = appearance === 'square'
    ? -(PRESENCE_BORDER_WIDTH[size] * 2)
    : PRESENCE_OFFSET[size];
  const presenceSize = PRESENCE_SIZES[size];

  return `
    bottom: ${presencePosition}px;
    height: ${presenceSize}px;
    right: ${presencePosition}px;
    width: ${presenceSize}px;
  `;
};
export const PresenceWrapper = styled.div`
  ${getPresenceLayout}
  position: absolute;
`;

// STATUS WRAPPER
const getStatusLayout = ({ appearance, size }) => {
  const statusPosition = appearance === 'square'
    ? -(PRESENCE_BORDER_WIDTH[size] * 2)
    : PRESENCE_OFFSET[size];
  const statusSize = PRESENCE_SIZES[size];

  return `
    height: ${statusSize}px;
    right: ${statusPosition}px;
    top: ${statusPosition}px;
    width: ${statusSize}px;
  `;
};
export const StatusWrapper = styled.div`
  ${getStatusLayout}
  position: absolute;
`;
