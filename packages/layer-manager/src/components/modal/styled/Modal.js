import styled, { keyframes } from 'styled-components';

const verticalOffset = 40;
const easingCurve = 'cubic-bezier(0.23, 1, 0.32, 1)';

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
  padding: 20px;
  position: absolute;
  right: 0;
  top: 0;
`;
export const Dialog = styled.div`
  animation: ${props => getDialogAnimation(props)} 500ms ${easingCurve};
  background-color: white;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 1px rgba(0, 0, 0, 0.1), 0 0 20px -6px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  max-width: 500px;
  padding: 20px;
  position: relative;
  transform: translate3d(0, ${props => `${props.stackIndex * verticalOffset}px`}, 0) scale(${props => 1 - (props.stackIndex * 0.1)});
  transition: transform 500ms ${easingCurve};
  will-change: transform;
`;
export const TabLoopTerminal = styled.span`
  background: 0;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(1px);
  height: 1px;
  outline: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

TabLoopTerminal.defaultProps = { tabIndex: 0 };
