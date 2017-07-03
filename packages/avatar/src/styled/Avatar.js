// @flow
import styled, { css } from 'styled-components';
import { akColorB200, akColorN70A, akColorN200A } from '@atlaskit/util-shared-styles';
import {
  BORDER_WIDTH,
  PRESENCE_OFFSET,
  PRESENCE_SIZES,
  TRANSITION_DURATION,
} from './constants';
import { getAvatarDimensions, getBorderRadius } from './utils';

// =================================

// translateZ used to invoke the GPU -- otherwise overflow is ignored when animating
export function getStyles(props) {
  const isInteractive = props.href || props.onClick;
  const boxSizing = 'content-box'; // fix for <buttons/>
  const borderWidth = `${BORDER_WIDTH[props.size]}px`;
  let backgroundColor = props.borderColor;

  /**
   * Variable styles
   */
  let cursor = 'default';
  let outline = 'none';
  let overlayShade = 'transparent';
  let overlayOpacity = 0;
  let pointerEvents = 'auto';
  let position = 'static';
  let transform = 'translateZ(0)';
  let transitionDuration = '0s';

  // Interaction: Hover
  if (isInteractive && (props.isActive || props.isHover)) {
    overlayShade = akColorN70A;
    overlayOpacity = 1;
  }

  // Interaction: Active
  if (isInteractive && props.isActive) {
    transform = 'scale(0.9)';
  }

  // Interaction: Focus
  if (isInteractive && props.isFocus && !props.isActive) {
    outline = 'none';
    backgroundColor = akColorB200;
    transitionDuration = TRANSITION_DURATION;
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
  if (props.isSelected) {
    overlayShade = akColorN200A;
    overlayOpacity = 1;
  }

  // Stack
  if (props.stackIndex) {
    position = 'relative';
  }

  return css`
    ${getAvatarDimensions};
    align-items: stretch;
    background-color: ${backgroundColor};
    border: 0;
    border-radius: ${getBorderRadius(props, { includeBorderWidth: true })};
    padding: ${borderWidth};
    box-sizing: ${boxSizing};
    cursor: ${cursor}
    display: flex;
    flex-direction: column;
    justify-content: center;
    outline: ${outline};
    overflow: hidden;
    pointer-events: ${pointerEvents};
    position: ${position}
    transform: ${transform};
    transition: background-color ${transitionDuration} ease-out;

    a &, button & {
      cursor: pointer;
    }

    &::after {
      background-color: ${overlayShade};
      border-radius: ${getBorderRadius};
      bottom: ${borderWidth};
      content: " ";
      left: ${borderWidth};
      opacity: ${overlayOpacity}
      position: absolute;
      right: ${borderWidth};
      top: ${borderWidth};
      transition: opacity ${TRANSITION_DURATION};
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
  ${props => getAvatarDimensions(props, { includeBorderWidth: true })}
  display: inline-block;
  position: relative;
  outline: 0;
  ${p => p.stackIndex && `z-index: ${p.stackIndex};`}
`;

// IMAGE WRAPPER
export const Inner = styled.div`
  ${getStyles}
`;

// PRESENCE WRAPPER
const getPresenceLayout = ({ appearance, size }) => {
  const presencePosition = appearance === 'square'
    ? -(BORDER_WIDTH[size] * 2)
    : PRESENCE_OFFSET[size];
  const presenceSize = PRESENCE_SIZES[size];

  return `
    bottom: ${presencePosition}px;
    height: ${presenceSize}px;
    right: ${presencePosition}px;
    width: ${presenceSize}px;
  `;
};
export const PresenceWrapper = styled.span`
  ${getPresenceLayout}
  position: absolute;
`;

// STATUS WRAPPER
const getStatusLayout = ({ appearance, size }) => {
  const statusPosition = appearance === 'square'
    ? -(BORDER_WIDTH[size] * 2)
    : PRESENCE_OFFSET[size];
  const statusSize = PRESENCE_SIZES[size];

  return `
    height: ${statusSize}px;
    right: ${statusPosition}px;
    top: ${statusPosition}px;
    width: ${statusSize}px;
  `;
};
export const StatusWrapper = styled.span`
  ${getStatusLayout}
  position: absolute;
`;
