// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import { ChildrenType, ComponentType } from '../types';

const duration = 300;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint
const verticalOffset = 16;

type Props = {
  children: ChildrenType,
  component: ComponentType,
  onEntered?: (node: Element, isAppearing: bool) => void,
  onExited?: (node: Element) => void,
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
  onEntered,
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
    onEntered,
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

// FADE
// ==============================

export const Fade = props => (
  <Animation
    styleDefault={{
      transition: `opacity ${duration}ms`,
    }}
    transition={{
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
    }}
    {...props}
  />
);

// SLIDE UP
// ==============================

export const SlideUp = (props) => {
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
          transform: `translate3d(0, ${verticalOffset * 2}px, 0)`,
        },
        entered: {
          opacity: 1,
          transform: restingTransform,
        },
        exiting: {
          opacity: 0,
          transform: `translate3d(0, -${verticalOffset * 2}px, 0)`,
        },
        exited: {
          opacity: 0,
          transform: `translate3d(0, ${verticalOffset * 2}px, 0)`,
        },
      }}
      {...props}
    />
  );
};
