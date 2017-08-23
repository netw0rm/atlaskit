// @flow
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { ChildrenType, ComponentType } from '../types';

const duration = 500;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
const verticalOffset = 20;

type Props = {
  children: ChildrenType,
  component: ComponentType,
  onEnterComplete?: (node: Element, isAppearing: bool) => void,
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
  onEnterComplete: onEntered,
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

export const SlideUp = props => (
  <Animation
    styleDefault={{
      transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
      transform: 'translate3d(0, 0, 0)',
    }}
    transition={{
      entering: {
        opacity: 0.2,
        transform: `translate3d(0, ${verticalOffset}px, 0)`,
      },
      entered: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
      },
      exiting: {
        opacity: 0,
        transform: `translate3d(0, -${verticalOffset}px, 0)`,
      },
    }}
    {...props}
  />
);
