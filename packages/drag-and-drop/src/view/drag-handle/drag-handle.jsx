// @flow
import React, { cloneElement, PureComponent } from 'react';
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

const noop = (): void => { };
const empty: Object = {};
const getFalse: () => boolean = () => false;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const primaryButton = 0;

export const sloppyClickThreshold: number = 5;

type DragTypes = 'KEYBOARD' | 'MOUSE';

type Props = {
  children?: any,
  isEnabled: boolean,
} & Callbacks

type State = {
  draggingWith: ?DragTypes,
  pending: ?Position
};

const logError = (...args: Array<mixed>) => console.error(...args);

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
  state: State

  state: State = {
    draggingWith: null,
    pending: null,
  };

  preventClick: boolean
  /* eslint-enable react/sort-comp */

  componentWillUnmount() {
    if (!this.state.draggingWith) {
      return;
    }
    this.unbindWindowEvents();
    this.props.onCancel();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isEnabled) {
      return;
    }

    // dragging is not enabled

    // if a drag is pending - clear it
    if (this.state.pending) {
      this.stopPendingMouseDrag();
      return;
    }

    // need to cancel a current drag
    if (this.state.draggingWith) {
      this.stopDragging(() => this.props.onCancel());
    }
  }

  onWindowMouseMove = (event: MouseEvent) => {
    const { draggingWith, pending } = this.state;
    if (draggingWith === 'KEYBOARD') {
      return;
    }

    // Mouse dragging

    const { button, clientX, clientY } = event;

    if (button !== primaryButton) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    if (!pending) {
      this.props.onMove(point);
      return;
    }

    // not yet dragging
    const shouldStartDrag = Math.abs(pending.x - point.x) > sloppyClickThreshold ||
                            Math.abs(pending.y - point.y) > sloppyClickThreshold;

    console.log('should start drag?', shouldStartDrag);

    if (shouldStartDrag) {
      this.startMouseDragging(() => this.props.onLift(point));
    }
  };

  onWindowMouseUp = (event: MouseEvent) => {
    console.info('WINDOW MOUSE CLICK');
    // Did not move far enough for it to actually be a drag
    if (this.state.pending) {
      // not blocking the default event - letting it pass through
      this.stopPendingMouseDrag();
      return;
    }

    invariant(this.state.draggingWith, 'should not be listening to mouse up events when nothing is dragging');

    if (this.state.draggingWith !== 'MOUSE') {
      return;
    }

    // Allowing any event.button type to drop. Otherwise you
    // might not get a corresponding mouseup with a mousedown.
    // We could do a`cancel` if the button is not the primary.
    this.stopMouseDragging(() => this.props.onDrop());
  };

  onWindowMouseDown = () => {
    if (this.state.draggingWith === 'MOUSE') {
      this.stopDragging(() => this.props.onCancel());
      logError(`Should not be able to trigger a mousedown while a MOUSE drag is occurring.
                Expecting a mouseup first.`);
      return;
    }

    // if dragging with a keyboard - cancel the drag
    this.stopDragging(() => this.props.onCancel());
  }

  onMouseDown = (event: MouseEvent) => {
    if (this.state.draggingWith === 'KEYBOARD') {
      // allowing any type of mouse down to cancel
      this.stopDragging(() => this.props.onCancel());
      return;
    }

    if (this.state.draggingWith) {
      this.stopDragging(() => this.props.onCancel());
      logError('mouse down will not start a drag as it is already dragging');
      return;
    }

    if (this.state.pending) {
      this.stopPendingMouseDrag();
      logError('pending mouse down already found - cannot start a new drag');
      return;
    }

    const { button, clientX, clientY } = event;
    event.stopPropagation();

    if (button !== primaryButton) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.startPendingMouseDrag(point);
  };

  onKeyDown = (event: KeyboardEvent): void => {
    const isMouseDragPending: boolean = Boolean(this.state.pending);

    if (!this.props.isEnabled) {
      return;
    }

    if (isMouseDragPending) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.stopPendingMouseDrag();
      }

      return;
    }

    if (!this.state.draggingWith) {
      if (event.key === ' ') {
        event.preventDefault();
        this.startKeyboardDragging(() => this.props.onKeyLift());
      }
      return;
    }

    // Dragging with either a keyboard or mouse

    // Preventing tabbing or submitting
    if (event.key === 'Tab' || event.key === 'Enter') {
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.stopDragging(() => this.props.onCancel());
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
      this.stopDragging(() => this.props.onDrop());
      return;
    }

    if (this.state.draggingWith !== 'KEYBOARD') {
      return;
    }

    // keyboard dragging only
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.props.onMoveForward();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.props.onMoveBackward();
    }
  }

  onClick = (event: MouseEvent): void => {
    if (!this.preventClick) {
      return;
    }
    this.preventClick = false;
    event.preventDefault();
  }

  startPendingMouseDrag = (point: Position) => {
    if (this.state.draggingWith) {
      console.error('cannot start a pending mouse drag when already dragging');
      return;
    }

    if (this.state.pending) {
      console.error('cannot start a pending mouse drag when there is already a pending position');
      return;
    }

    // need to bind the window events
    this.bindWindowEvents();

    const state: State = {
      draggingWith: null,
      pending: point,
    };

    this.preventClick = false;
    this.setState(state);
  }

  startMouseDragging = (done?: () => void = noop) => {
    if (this.state.draggingWith) {
      console.error('cannot start dragging when already dragging');
      return;
    }

    if (!this.state.pending) {
      console.error('cannot start mouse drag when there is not a pending position');
      return;
    }

    // events are already bound from starting the pending mouse drag

    const state: State = {
      draggingWith: 'MOUSE',
      pending: null,
    };

    this.setState(state, done);
  }

  startKeyboardDragging = (done?: () => void = noop) => {
    invariant(!this.state.draggingWith, 'cannot start dragging when already dragging');

    // need to bind the window events
    this.bindWindowEvents();

    const state: State = {
      draggingWith: 'KEYBOARD',
      pending: null,
    };

    this.setState(state, done);
  }

  stopPendingMouseDrag = (done?: () => void = noop) => {
    invariant(this.state.pending, 'cannot stop pending drag when there is none');

    this.unbindWindowEvents();
    this.setState({
      draggingWith: null,
      pending: null,
    }, done);
  }

  stopMouseDragging = (done?: () => void = noop) => {
    if (this.state.draggingWith !== 'MOUSE') {
      console.error('trying to end a mouse drag when not dragging with a mouse');
      return;
    }

    this.unbindWindowEvents();
    this.preventClick = true;
    this.setState({
      draggingWith: null,
      pending: null,
    }, done);
  }

  stopDragging = (done?: () => void = noop) => {
    invariant(this.state.draggingWith, 'cannot stop dragging when not dragging');

    this.unbindWindowEvents();
    this.setState({
      draggingWith: null,
      pending: null,
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
    const { children, isEnabled } = this.props;

    const props: Object = isEnabled ? {
      onMouseDown: this.onMouseDown,
      onKeyDown: this.onKeyDown,

      // Allow tabbing to this element
      tabIndex: 0,

      // Stop html5 drag a drop
      draggable: false,
      onDragStart: getFalse,
      onDrop: getFalse,
      onClick: this.onClick,
    } : empty;

    return cloneElement(children, props);

    // return cloneElement(children, isEnabled ? props : {});

    // const clone = React.Children.map(this.props.children, child =>
    //   React.cloneElement(child, {
    //     onMouseDown: this.onMouseDown,
    //     onKeyDown: this.onKeyDown,
    //     draggable: false,
    //   })
    // );

    // return cloneElement(Container, {
    //   onMouseDown: this.onMouseDown,
    //   onKeyDown: this.onKeyDown,
    //   draggable: false,
    // }, this.props.children);

    // return (
    //   <Container
    //     isDragging={Boolean(this.state.draggingWith)}
    //     isEnabled={isEnabled}
    //     onMouseDown={this.onMouseDown}
    //     onKeyDown={this.onKeyDown}
    //     draggable="false"
    //     {...extraProps}
    //   >
    //     {this.props.children}
    //   </Container>
    // );
  }
}
