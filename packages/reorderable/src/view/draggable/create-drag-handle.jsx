// @flow
import React, { PureComponent } from 'react';
import invariant from 'invariant';
import styled from 'styled-components';
import type { Position } from '../../types';

export type Callbacks = {
  onLift: (point: Position) => void,
  onKeyLift: () => void,
  onMove: (point: Position) => void,
  onMoveForward: () => void,
  onMoveBackward: () => void,
  onDrop: () => void,
  onCancel: () => void,
}

const noop = () => {};

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

type DragTypes = 'KEYBOARD' | 'MOUSE';

// need a component so that we can kill events on unmount
export class Handle extends PureComponent {

  /* eslint-disable react/sort-comp */
  props: Props
  state: {|
    draggingWith: ?DragTypes;
  |}

  state = {
    draggingWith: null,
  }
  /* eslint-enable react/sort-comp */

  componentWillUnmount() {
    if (!this.state.draggingWith) {
      return;
    }

    this.unbindWindowEvents();
    this.props.onCancel();
  }

  onWindowMouseMove = (event: SyntheticMouseEvent) => {
    if (this.state.draggingWith === 'KEYBOARD') {
      return;
    }

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

  onWindowMouseUp = (event: SyntheticMouseEvent): void => {
    invariant(this.state.draggingWith, 'should not be listening to mouse up events when nothing is dragging');

    if (this.state.draggingWith === 'MOUSE' && event.button !== primaryClick) {
      return;
    }

    this.stopDragging(() => this.props.onDrop());
  };

  onWindowMouseDown = (): void => {
    if (this.state.draggingWith !== 'KEYBOARD') {
      return;
    }

    this.stopDragging(() => this.props.onDrop());
  }

  onMouseDown = (event: SyntheticMouseEvent) => {
    if (this.state.draggingWith === 'KEYBOARD') {
      this.stopDragging(() => this.props.onCancel());
      return;
    }

    invariant(!this.state.draggingWith, 'mouse down will not start a drag as it is already dragging');

    if (!this.props.isEnabled) {
      return;
    }

    const { button, clientX, clientY } = event;

    if (button !== primaryClick) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.startDragging('MOUSE', () => this.props.onLift(point));
  };

  onKeyDown = (event: SyntheticKeyboardEvent) => {
    if (!this.props.isEnabled) {
      return;
    }

    // space bar
    if (event.key === ' ') {
      event.preventDefault();
      // not allowing double lift
      if (this.state.draggingWith) {
        this.stopDragging(() => this.props.onDrop());
        return;
      }

      this.startDragging('KEYBOARD', () => this.props.onKeyLift());
    }

    if (!this.state.draggingWith) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.stopDragging(() => this.props.onCancel());
    }

    // blocking tabbing while dragging
    if (event.key === 'Tab') {
      event.preventDefault();
    }

    // not allowing arrow keys while dragginw with mouse
    if (this.state.draggingWith === 'MOUSE') {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.props.onMoveForward();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.props.onMoveBackward();
    }
  }

  startDragging = (type: DragTypes, done?: Function = noop) => {
    invariant(!this.state.draggingWith, 'cannot start dragging when already dragging');
    this.bindWindowEvents();
    this.setState({
      draggingWith: type,
    }, done);
  }

  stopDragging = (done?: Function = noop) => {
    invariant(this.state.draggingWith, 'cannot stop dragging when not dragging');

    this.unbindWindowEvents();
    this.setState({
      draggingWith: null,
    }, done);
  }

  unbindWindowEvents = () => {
    console.log('unbinding mouse events');
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
  }

  bindWindowEvents = () => {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
    window.addEventListener('mousedown', this.onWindowMouseDown);
  }

  // bindMouseDragEvents = () => {
  //   invariant(!this.areMouseEventsBound, 'mouse events are already bound');
  //   invariant(!this.isDragging, 'cannot bind mouse events - already dragging');

  //   console.log('binding mouse events');

  //   window.addEventListener('mousemove', this.onWindowMouseMove);
  //   window.addEventListener('mouseup', this.onWindowMouseUp);

  //   this.areMouseEventsBound = true;
  // };

  // unbindMouseDragEvents = () => {
  //   invariant(this.areMouseEventsBound, 'there are no mouse events bound');
  //   console.log('unbinding mouse events');

  //   window.removeEventListener('mousemove', this.onWindowMouseMove);
  //   window.removeEventListener('mouseup', this.onWindowMouseUp);

  //   this.areMouseEventsBound = false;
  // };

  render() {
    return (
      <Container
        isDragging={Boolean(this.state.draggingWith)}
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

