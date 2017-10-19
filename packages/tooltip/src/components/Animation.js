// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import { ChildrenType, ComponentType, PlacementType } from '../types';

const ENTER_DURATION = 120;
const EXIT_DURATION = 120;
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
  timeout: number | { enter: number, exit: number },
  transition: {
    entering?: {},
    entered?: {},
    exiting?: {},
    exited?: {},
  },
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
  timeout,
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
    timeout,
    unmountOnExit: true,
  };

  return (
    <Transition {...transitionProps}>
      {(status) => {
        const styles = {
          ...style,
          ...styleDefault,
          ...transition[status],
        };

        return <Tag style={styles} {...props} />;
      }}
    </Transition>
  );
}
Animation.defaultProps = {
  component: 'div',
};

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
  { immediatelyHide, immediatelyShow, placement, ...props }:
  {
    immediatelyHide: boolean,
    immediatelyShow: boolean,
    placement: PlacementType,
    props: Array<any>
  }
) => {
  const horizontalOffset = xPos[placement] || 0;
  const verticalOffset = yPos[placement] || 0;

  const restingTransform = 'translate3d(0, 0, 0)';
  const timeout = {
    enter: immediatelyShow ? 1 : ENTER_DURATION,
    exit: immediatelyHide ? 1 : EXIT_DURATION,
  };

  return (
    <Animation
      styleDefault={{
        transition: `transform ${timeout.enter}ms ${easing}, opacity ${timeout.enter}ms linear`,
        transform: restingTransform,
      }}
      transition={{
        entering: {
          opacity: 0,
          transform: `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0)`,
        },
        entered: {
          opacity: 1,
          transform: restingTransform,
        },
        exiting: {
          opacity: 0,
          transition: `opacity ${timeout.exit}ms linear`,
        },
      }}
      timeout={timeout}
      {...props}
    />
  );
};
