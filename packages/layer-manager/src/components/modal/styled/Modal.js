import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled, { keyframes } from 'styled-components';
import { WIDTH_ENUM } from '../shared-variables';

const verticalOffset = 40;
const easingCurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
const getWidth = ({ width }) => WIDTH_ENUM.widths[width];
const viewportMargin = akGridSizeUnitless * 7.5;
const doubleViewportMargin = viewportMargin * 2;
const overlayAnimationMap = {
  enter: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  leave: keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `,
};
const dialogAnimationMap = {
  enter: keyframes`
    from { transform: translate3d(0, ${verticalOffset}px, 0); opacity: 0; }
    to { transform: translate3d(0, 0, 0); opacity: 1; }
  `,
  leave: keyframes`
    from { transform: translate3d(0, 0, 0); opacity: 1; }
    to { transform: translate3d(0, ${verticalOffset}px, 0); opacity: 0; }
  `,
};
const getOverlayAnimation = ({ animation }) => overlayAnimationMap[animation];
const getDialogAnimation = ({ animation }) => dialogAnimationMap[animation];

export const Overlay = styled.div`
  animation: ${props => getOverlayAnimation(props)} 500ms;
  align-items: center;
  background-color: rgba(9, 30, 66, 0.54);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Dialog = styled.div`
  animation: ${props => getDialogAnimation(props)} 500ms ${easingCurve};
  position: relative;
  transform: translate3d(0, ${props => `${props.stackIndex * verticalOffset}px`}, 0) scale(${props => 1 - (props.stackIndex * 0.1)});
  transition: transform 500ms ${easingCurve};
  will-change: transform;
  outline: 0;
  /* Styles taken from ModalPositioner */
  width: ${getWidth}px;
  height: calc(100% - ${doubleViewportMargin}px);
  max-height: calc(100% - 1px);
  max-width: calc(100% - ${doubleViewportMargin}px);
`;

export const TabLoopTerminal = styled.span`
  background: 0;
  border: 0;
  clip-path: inset(1px);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  outline: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  text-align: left;
  white-space: nowrap;
  width: 1px;
`;

TabLoopTerminal.defaultProps = { tabIndex: 0 };
