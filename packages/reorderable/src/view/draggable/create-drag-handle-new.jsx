// @flow
import React, { cloneElement, PureComponent } from 'react';
import invariant from 'invariant';
import type { Position } from '../../state/types';

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
export const primaryClick = 0;

const threshold: number = 10;

// need a component so that we can kill events on unmount
export class Handle extends PureComponent {
  props: {
    onLift: (point: Position) => void,
    onMove: (point: Position) => void,
    onDrop: (point: Position) => void,
    children: any,
  }

  areMouseEventsBound: boolean;

  constructor(props, context) {
    super(props, context);

    this.areMouseEventsBound = false;
  }

  bindWindowMouseEvents = () => {
    invariant(!this.areMouseEventsBound, 'mouse events are already bound');
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

  onMouseMove = (event: SyntheticMouseEvent) => {
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
    const { button, clientX, clientY } = event;

    if (button !== primaryClick) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.unbindWindowMouseEvents();
    this.props.onDrop(point);
  };

  onMouseDown = (event: SyntheticMouseEvent) => {
    const { button, clientX, clientY } = event;

    if (button !== primaryClick) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.bindWindowMouseEvents();
    this.props.onLift(point);
  };

  componentWillUnmount() {
    // TODO: true check is: isDragging?
    if(this.areMouseEventsBound) {
      this.props.onCancel();
    }

    if(this.areMouseEventsBound) {
      this.unbindWindowMouseEvents();
    }
  }

  render() {
    // not creating any new nodes
    // could use ref rather than adding handler directly
    return cloneElement(this.props.children, {
      tabIndex: '0',
      onMouseDown: this.onMouseDown,
    });
  }
}

export default (onLift: (point: Position) => void,
  onMove: (point: Position) => void,
  onDrop: (point: Position) => void,
  onCancel: () => void
) => (el: React$Element<*>) => (
  <Handle
    onLift={onLift}
    onMove={onMove}
    onDrop={onDrop}
    onCancel={onCancel}
  >
    {el}
  </Handle>
);

