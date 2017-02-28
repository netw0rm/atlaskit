// @flow
import React, { PureComponent } from 'react';
import invariant from 'invariant';
import styled from 'styled-components';
import type { Position } from '../../types';

// declare function OnLift(point: Position): void;

export type OnLift = (point: Position) => void;
export type OnMove = (point: Position) => void;
export type OnDrop = () => void;
export type OnCancel = () => void;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
export const primaryClick = 0;

// TODO: drag threshold
// const threshold: number = 10;

type Props = {
  onLift: OnLift,
  onMove: OnMove,
  onDrop: OnDrop,
  onCancel: OnCancel,
  children: React$Element<*>,
  isEnabled: boolean,
}

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

    if (this.isDragging) {
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
    const { button, clientX, clientY } = event;

    if (button !== primaryClick) {
      return;
    }

    const point: Position = {
      x: clientX,
      y: clientY,
    };

    this.unbindWindowMouseEvents();
    this.setState({
      isDragging: false,
    });
    this.props.onDrop(point);
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
      >
        {this.props.children}
      </Container>
    );
  }
}

export default (onLift: OnLift,
  onMove: OnMove,
  onDrop: OnDrop,
  onCancel: OnCancel
) => (isEnabled: boolean) => (el: React$Element<*>) => (
  // https://github.com/facebook/flow/issues/1964
  /* eslint-disable react/no-children-prop */
  <Handle
    onLift={onLift}
    onMove={onMove}
    onDrop={onDrop}
    onCancel={onCancel}
    isEnabled={isEnabled}
    children={el}
  />
);

