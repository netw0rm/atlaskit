// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import { ChildrenType, ComponentType, PositionType } from '../types';

const duration = 300;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint
const distance = 8;

type EnterFunc = (node: Element, isAppearing: bool) => void;
type ExitFunc = (node: Element) => void;

type Props = {
  children: ChildrenType,
  component: ComponentType,
  onEnter?: EnterFunc,
  onEntering?: EnterFunc,
  onEntered?: EnterFunc,
  onExit?: ExitFunc,
  onExiting?: ExitFunc,
  onExited?: ExitFunc,
  in: boolean,
  style: {},
  styleDefault: {},
  transition: {
    entering?: {},
    entered?: {},
    exiting?: {},
    exited?: {},
  },
};
const DefaultProps = {
  component: 'div',
};

// BASE
// ==============================

/**
  To achieve a "lazy mount" and clean up our component after unmounting,
  the following props must be set to true:
  - appear
  - mountOnEnter
  - unmountOnExit

  Read more https://reactcommunity.org/react-transition-group/#Transition-prop-mountOnEnter
*/

function Animation({
  component: Tag,
  in: hasEntered,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  style,
  styleDefault,
  transition,
  ...props
}: Props) {
  const transitionProps = {
    appear: true,
    in: hasEntered,
    mountOnEnter: true,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout: { enter: 0, exit: duration },
    unmountOnExit: true,
  };

  return (
    <Transition {...transitionProps}>
      {(state) => {
        const styles = {
          ...style,
          ...styleDefault,
          ...transition[state],
        };

        return <Tag style={styles} {...props} />;
      }}
    </Transition>
  );
}
Animation.defaultProps = DefaultProps;

// SLIDE
// ==============================

const xPos = {
  left: distance,
  right: -distance,
};
const yPos = {
  bottom: -distance,
  top: distance,
};

// eslint-disable-next-line import/prefer-default-export
export const Slide = (
  { isFlipped, position, ...props }:
  { isFlipped: boolean, position: PositionType, props: Array<any> }
) => {
  const x = xPos[position] || 0;
  const y = yPos[position] || 0;
  const horizontalOffset = x * (isFlipped ? -1 : 1);
  const verticalOffset = y * (isFlipped ? -1 : 1);

  const restingTransform = 'translate3d(0, 0, 0)';

  return (
    <Animation
      styleDefault={{
        transition: `transform ${duration}ms ${easing}, opacity ${duration}ms linear`,
        transform: restingTransform,
      }}
      transition={{
        entering: {
          opacity: 0.2,
          transitionDelay: '1000ms',
          transform: `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0)`,
        },
        entered: {
          opacity: 1,
          transform: restingTransform,
        },
      }}
      {...props}
    />
  );
};
