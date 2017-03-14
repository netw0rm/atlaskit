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

const allowDragProps = {
  tabIndex: '0',
};

const empty = {};

type Props = {
  children?: React$Element<*>,
  isEnabled: boolean,
} & Callbacks

type DragTypes = 'KEYBOARD' | 'MOUSE';

// exporting for testing
export const getCursor = (isEnabled: boolean, isDragging: boolean) => {
  if (!isEnabled) {
    return 'auto';
  }
  return isDragging ? 'grabbing' : 'grab';
};

const Container = styled.div`
  cursor: ${props => getCursor(props.isEnabled, props.isDragging)};
`;

// need a component so that we can kill events on unmount
export default class Handle extends PureComponent {

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

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.draggingWith && !nextProps.isEnabled) {
      this.stopDragging(() => this.props.onCancel());
    }
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

  onWindowMouseUp = (): void => {
    invariant(
      this.state.draggingWith,
      'should not be listening to mouse up events when nothing is dragging'
    );

    if (this.state.draggingWith === 'MOUSE') {
      return;
    }

    // Allowing any event.button type to drop. Otherwise you
    // might not get a corresponding mouseup with a mousedown.
    // We could do a`cancel` if the button is not the primary.
    this.stopDragging(() => this.props.onDrop());
  };

  onWindowMouseDown = (): void => {
    invariant(
      this.state.draggingWith === 'KEYBOARD',
      'should not be able to trigger a mouse down while a MOUSE drag is occuring'
    );

    this.stopDragging(() => this.props.onDrop());
  }

  onMouseDown = (event: SyntheticMouseEvent) => {
    if (this.state.draggingWith === 'KEYBOARD') {
      // allowing any type of mouse down to cancel
      this.stopDragging(() => this.props.onCancel());
      return;
    }

    invariant(
      !this.state.draggingWith,
      'mouse down will not start a drag as it is already dragging'
    );

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
      // space bar to drop when dragging with keyboard or mouse
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
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
  }

  bindWindowEvents = () => {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
    window.addEventListener('mousedown', this.onWindowMouseDown);
  }

  render() {
    const { isEnabled } = this.props;
    const extraProps = isEnabled ? allowDragProps : {};

    return (
      <Container
        isDragging={Boolean(this.state.draggingWith)}
        isEnabled={isEnabled}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        draggable="false"
        {...extraProps}
      >
        {this.props.children}
      </Container>
    );
  }
}
