// @flow
import React, { cloneElement, PureComponent } from 'react';
import invariant from 'invariant';
import type { Position } from '../../types';

const noop = (): void => { };
const empty: Object = {};
const getFalse: () => boolean = () => false;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
const primaryButton = 0;

// The amount of pixels that need to move before we consider the movement
// a drag rather than a click.
export const sloppyClickThreshold: number = 5;

type DragTypes = 'KEYBOARD' | 'MOUSE';

export type Callbacks = {
  onLift: (point: Position) => void,
  onKeyLift: () => void,
  onMove: (point: Position) => void,
  onMoveForward: () => void,
  onMoveBackward: () => void,
  onDrop: () => void,
  onCancel: () => void,
}

type Props = {
  children?: any,
  isEnabled: boolean,
} & Callbacks

type State = {
  draggingWith: ?DragTypes,
  pending: ?Position,
};

// need a component so that we can kill events on unmount
export default class DragHandle extends PureComponent {

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
    this.preventClick = false;
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
    const shouldStartDrag = Math.abs(pending.x - point.x) >= sloppyClickThreshold ||
                            Math.abs(pending.y - point.y) >= sloppyClickThreshold;

    if (shouldStartDrag) {
      this.startDragging('MOUSE', () => this.props.onLift(point));
    }
  };

  onWindowMouseUp = () => {
    // Did not move far enough for it to actually be a drag
    if (this.state.pending) {
      // not blocking the default event - letting it pass through
      this.stopPendingMouseDrag();
      return;
    }

    if (!this.state.draggingWith) {
      console.error('should not be listening to mouse up events when nothing is dragging');
      return;
    }

    if (this.state.draggingWith !== 'MOUSE') {
      return;
    }

    // Allowing any event.button type to drop. Otherwise you
    // might not get a corresponding mouseup with a mousedown.
    // We could do a`cancel` if the button is not the primary.
    this.stopDragging(() => this.props.onDrop());
  };

  onWindowMouseDown = () => {
    if (this.state.draggingWith === 'MOUSE') {
      console.error(`Should not be able to trigger a mousedown while a MOUSE drag
                    is occurring. Expecting a mouseup first.`);
    }

    this.stopDragging(() => this.props.onCancel());
  }

  onMouseDown = (event: MouseEvent) => {
    if (this.state.draggingWith === 'KEYBOARD') {
      // allowing any type of mouse down to cancel
      this.stopDragging(() => this.props.onCancel());
      return;
    }

    const { button, clientX, clientY } = event;
    event.stopPropagation();
    event.preventDefault();

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
        this.startDragging('KEYBOARD', () => this.props.onKeyLift());
      }
      return;
    }

    // Dragging with either a keyboard or mouse

    // Blocking standard submission action
    if (event.key === 'Enter') {
      event.preventDefault();
      return;
    }

    // Preventing tabbing or submitting
    if (event.key === 'Tab') {
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.stopDragging(() => this.props.onCancel());
      return;
    }

    if (this.state.draggingWith === 'MOUSE') {
      // Want to block scrolling the page with the space bar
      if (event.key === ' ') {
        event.preventDefault();
      }
      return;
    }

    // Only keyboard dragging

    if (event.key === ' ') {
      event.preventDefault();
      this.stopDragging(() => this.props.onDrop());
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
    console.log('onClick called', { preventClick: this.preventClick });
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

    this.setState(state);
  }

  startDragging = (type: DragTypes, done?: () => void = noop) => {
    if (this.state.draggingWith) {
      console.error('cannot start dragging when already dragging');
      return;
    }

    if (type === 'MOUSE' && !this.state.pending) {
      console.error('cannot start mouse drag when there is not a pending position');
      return;
    }

    // keyboard events already bound for mouse dragging
    if (type === 'KEYBOARD') {
      this.bindWindowEvents();
    }

    const state: State = {
      draggingWith: type,
      pending: null,
    };
    this.setState(state, done);
  }

  stopPendingMouseDrag = (done?: () => void = noop) => {
    invariant(this.state.pending, 'cannot stop pending drag when there is none');

    // we need to allow the click event to get through
    this.preventClick = false;

    this.unbindWindowEvents();
    this.setState({
      draggingWith: null,
      pending: null,
    }, done);
  }

  stopDragging = (done?: () => void = noop) => {
    if (!this.state.draggingWith) {
      console.error('cannot stop dragging when not dragging');
      return;
    }

    this.unbindWindowEvents();

    // Need to block any click actions
    this.preventClick = true;

    const state: State = {
      draggingWith: null,
      pending: null,
    };
    this.setState(state, done);
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
    const { draggingWith } = this.state;

    // todo: namespace props
    const props: Object = isEnabled ? {
      onMouseDown: this.onMouseDown,
      onKeyDown: this.onKeyDown,

      // Conditionally block clicks
      onClick: this.onClick,

      // Allow tabbing to this element
      tabIndex: 0,

      // Aria
      'aria-grabbed': Boolean(draggingWith),

      // Stop html5 drag a drop
      draggable: false,
      onDragStart: getFalse,
      onDrop: getFalse,
    } : empty;

    return cloneElement(children, { handleProps: props });
  }
}
