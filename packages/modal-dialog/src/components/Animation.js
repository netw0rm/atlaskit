// @flow
import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types'; // eslint-disable-line import/no-extraneous-dependencies

type ChildrenType = PropType<Array<Element<any>> | Element<any>, any>;
type ComponentType = PropType<Component<{}, {}, {}>, any>;
// type ElementType = PropType<Element<mixed>, any>;
// type FunctionType = (...args: Array<any>) => mixed;

const duration = 500;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
const verticalOffset = 40;

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
    onEntered,
    in: hasEntered,
    mountOnEnter: true,
    timeout: duration,
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

export function Fade(props) {
  return (
    <Animation
      styleDefault={{
        transition: `opacity ${duration}ms ${easing}`,
        opacity: 0,
      }}
      transition={{
        entering: { opacity: 1 },
        entered: { opacity: 1 },
      }}
      {...props}
    />
  );
}

// SLIDE UP

export function SlideUp(props) {
  return (
    <Animation
      styleDefault={{
        transition: `transform ${duration}ms ${easing}`,
        transform: `translate3d(0, ${verticalOffset}px, 0)`,
      }}
      transition={{
        entering: { transform: 'translate3d(0, 0, 0)' },
        entered: { transform: 'translate3d(0, 0, 0)' },
      }}
      {...props}
    />
  );
}
