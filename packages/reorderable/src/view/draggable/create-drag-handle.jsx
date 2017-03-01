// @flow
import React, { PureComponent } from 'react';
import invariant from 'invariant';
import styled from 'styled-components';
import type { Position } from '../../types';

// declare function OnLift(point: Position): void;

export type Callbacks = {
  onLift: (point: Position) => void,
  onMove: (point: Position) => void,
  onDrop: () => void,
  onCancel: () => void,
  onKeyLift: () => void,
  onKeyUp: () => void,
  onKeyDown: () => void,
}

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const primaryClick = 0;
// TODO: drag threshold
// const threshold: number = 10;

type Props = {
  children?: React$Element<*>,
  isEnabled: boolean,
} & Callbacks

const Container = styled.div`
  cursor: ${props => (props.isDragging ? 'grabbing' : 'grab')};
`;

// need a component so that we can kill events on unmount
export class Handle extends PureComponent {

  /* eslint-disable react/sort-comp */
  props: Props
  areMouseEventsBound: boolean;
  state: {|
    isDragging: boolean
  |}

  state = {
    isDragging: false,
  }
  /* eslint-enable react/sort-comp */

  constructor(props: Props, context: any) {
    super(props, context);

    this.areMouseEventsBound = false;
  }

  componentWillUnmount() {
    if (this.areMouseEventsBound) {
      this.unbindWindowMouseEvents();
    }

    if (this.state.isDragging) {
      this.props.onCancel();
    }
  }

  onMouseMove = (event: SyntheticMouseEvent) => {
    // TODO: cancel drag if enabled is changed while dragging

    const { button, clientX, clientY } = event;

    if (button !== primaryClick) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.props.onMove(point);
  };

  onMouseUp = (event: SyntheticMouseEvent): void => {
    const { button } = event;

    if (button !== primaryClick) {
      return;
    }

    this.unbindWindowMouseEvents();

    // drag might have been cancelled via keyboard
    if (!this.state.isDragging) {
      return;
    }

    this.setState({
      isDragging: false,
    });
    this.props.onDrop();
  };

  onMouseDown = (event: SyntheticMouseEvent) => {
    if (!this.props.isEnabled) {
      return;
    }

    const { button, clientX, clientY } = event;

    if (this.isDragging) {
      console.warn('mouse down will not start a drag as it is already dragging');
      return;
    }

    if (button !== primaryClick) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.bindWindowMouseEvents();
    this.setState({
      isDragging: true,
    });
    this.props.onLift(point);
  };

  onKeyDown = (event: SyntheticKeyboardEvent) => {
    if (!this.props.isEnabled) {
      return;
    }

    // keeping it simple for now and not allowing keyboard while using the mouse
    // if (this.areMouseEventsBound) {
    //   return;
    // }

    // space bar
    if (event.key === ' ') {
      event.preventDefault();
      // not allowing double lift
      if (this.state.isDragging) {
        this.setState({
          isDragging: false,
        });
        this.props.onDrop();
        return;
      }

      this.setState({
        isDragging: true,
      });
      this.props.onKeyLift();
    }

    if (!this.state.isDragging) {
      return;
    }

    if (event.key === 'Escape') {
      this.setState({
        isDragging: false,
      });
      this.props.onCancel();
    }

    if (event.key === 'ArrowDown') {
      this.props.onKeyDown();
    }

    if (event.key === 'ArrowUp') {
      this.props.onKeyUp();
    }
  }

  bindWindowMouseEvents = () => {
    invariant(!this.areMouseEventsBound, 'mouse events are already bound');
    invariant(!this.isDragging, 'cannot bind mouse events - already dragging');

    console.log('binding mouse events');

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    this.areMouseEventsBound = true;
  };

  unbindWindowMouseEvents = () => {
    invariant(this.areMouseEventsBound, 'there are no mouse events bound');
    console.log('unbinding mouse events');

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);

    this.areMouseEventsBound = false;
  };

  render() {
    return (
      <Container
        isDragging={this.state.isDragging}
        tabIndex="0"
        draggable="false"
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
      >
        {this.props.children}
      </Container>
    );
  }
}

export default (callbacks: Callbacks) => (isEnabled: boolean) => (el: React$Element<*>) => (
  // https://github.com/facebook/flow/issues/1964
  /* eslint-disable react/no-children-prop */
  <Handle
    {...callbacks}
    isEnabled={isEnabled}
  >
    {el}
  </Handle>
);

