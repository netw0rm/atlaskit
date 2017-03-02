// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import invariant from 'invariant';
import type {
    TypeId,
    Position,
} from '../../types';
import type { Provide, MapProps } from './types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import type { Speed } from '../moveable';
import createDragHandle from './create-drag-handle';
import type { Callbacks } from './create-drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getDisplayName from '../get-display-name';
import storeKey from '../../state/get-store-key';
import makeSelector from './make-selector';

import {
  lift as liftAction,
  move as moveAction,
  moveForward as moveForwardAction,
  moveBackward as moveBackwardAction,
  drop as dropAction,
  cancel as cancelAction,
  dropFinished as dropFinishedAction,
} from '../../state/action-creators';

type DraggableState = {|
  isDragging: boolean
|}

type MapState = (state: DraggableState, ownProps: Object, getDragHandle: Function) => Object;
const empty = {};
const identity = x => x;
const nowhere: Position = { x: 0, y: 0 };

type DispatchProps = {|
  lift: typeof liftAction,
  move: typeof moveAction,
  drop: typeof dropAction,
  dropFinished: typeof dropFinishedAction,
  move: typeof moveAction,
  moveForward: typeof moveForwardAction,
  moveBackward: typeof moveBackwardAction,
  cancel: typeof cancelAction,
|}

type Props = MapProps & DispatchProps

type DefaultProps = {|
  offset: Position
|}

type ComponentState = {|
  wasDragging: boolean,
  ref: ?Element
|}

// user-select: ${props => (props.isDragging ? 'none' : 'auto')};
const Container = styled.div`
  user-select: none;
`;

type Movement = {|
  speed: Speed,
  zIndex: string
|}

const getMovement = (isDragging: boolean,
  wasDragging: boolean,
  canAnimate: boolean) => {
  if (isDragging) {
    return {
      speed: canAnimate ? 'FAST' : 'NONE',
      zIndex: '100',
    };
  }

  if (!canAnimate) {
    return {
      speed: 'NONE',
      zIndex: 'auto',
    };
  }

  if (wasDragging) {
    return {
      speed: 'STANDARD',
      zIndex: '50',
    };
  }

  return {
    speed: 'FAST',
    zIndex: 'auto',
  };
};

export default (type: TypeId,
  provide: Provide,
  map?: MapState = () => empty) =>
  (Component: any): any => {
    class Draggable extends PureComponent {
      /* eslint-disable react/sort-comp */
      props: Props
      defaultProps: DefaultProps
      state: ComponentState
      getHandle: Function

      state: ComponentState = {
        wasDragging: false,
        ref: null,
      }

      static displayName = `Draggable(${getDisplayName(Component)})`

      static defaultProps = {
        offset: nowhere,
      }
      /* eslint-enable */

      constructor(props, context) {
        super(props, context);

        this.getHandle = createDragHandle({
          onLift: this.onLift,
          onMove: this.onMove,
          onDrop: this.onDrop,
          onCancel: this.onCancel,
          onKeyLift: this.onKeyLift,
          onMoveBackward: this.onMoveBackward,
          onMoveForward: this.onMoveForward,
        });
      }

      componentWillReceiveProps(nextProps) {
        const wasDragging = this.props.isDragging && !nextProps.isDragging;

        if (this.state.wasDragging !== wasDragging) {
          this.setState({
            wasDragging,
          });
        }
      }

      onMoveEnd = () => {
        if (!this.state.wasDragging) {
          return;
        }

        const { id, dropFinished } = this.props;

        console.log('on move end!!');
        dropFinished(id);
      }

      onLift = (selection: Position) => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const { id, isDragEnabled, lift } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.ref);

        lift(id, type, center, scroll, selection);
      }

      onKeyLift = () => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const { id, isDragEnabled, lift } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.ref);

        // using center position as selection
        lift(id, type, center, scroll, center);
      }

      onMove = (point: Position) => {
        const { id, isDragEnabled, initial, move } = this.props;

        if (isDragEnabled === false) {
          throw new Error('need to cancel the current drag');
        }

        // dimensions not provided yet
        if (!initial) {
          return;
        }

        const scroll: Position = getScrollPosition();

        // diffs
        const mouseDiff: Position = {
          x: point.x - initial.selection.x,
          y: point.y - initial.selection.y,
        };
        const scrollDiff: Position = {
          x: scroll.x - initial.scroll.x,
          y: scroll.y - initial.scroll.y,
        };

        const offset: Position = {
          x: mouseDiff.x + scrollDiff.x,
          y: mouseDiff.y + scrollDiff.y,
        };
        const center: Position = {
          x: initial.center.x + offset.x,
          y: initial.center.y + offset.y,
        };

        move(id, offset, center);
      }

      onMoveForward = () => {
        const { id, moveForward } = this.props;

        moveForward(id);
      }

      onMoveBackward = () => {
        const { id, moveBackward } = this.props;

        moveBackward(id);
      }

      onDrop = () => {
        const { id, drop } = this.props;

        drop(id);
      }

      onCancel = () => {
        const { id, cancel } = this.props;

        cancel(id);
      }

      setRef = (ref: ?Element) => {
        // need to trigger a child render when ref changes
        this.setState({
          ref,
        });
      }

      componentWillUnmount() {
        console.warn('unmounting draggable', this.props.id);
      }

      render() {
        const handle = this.getHandle(this.props.isDragEnabled);

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return handle;
        };

        const snapshot: DraggableState = {
          isDragging: this.props.isDragging,
        };

        const additionalProps = map(snapshot, this.props, requestDragHandle);

        // TODO: clear draggable props
        const props = {
          ...this.props,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : handle;

        const movement: Movement = getMovement(
          this.props.isDragging,
          this.state.wasDragging,
          this.props.canAnimate
        );

        return (
          <Moveable
            speed={movement.speed}
            zIndex={movement.zIndex}
            destination={this.props.offset}
            onMoveEnd={this.onMoveEnd}
            innerRef={this.setRef}
          >
            {wrap(
              <DraggableDimensionPublisher
                itemId={this.props.id}
                type={type}
                outerRef={this.state.ref}
              >
                <Container
                  isDragging={this.props.isDragging}
                >
                  <Component {...props} />
                </Container>
              </DraggableDimensionPublisher>
            )}
          </Moveable>
        );
      }
    }

    const mapDispatchToProps = {
      lift: liftAction,
      move: moveAction,
      moveBackward: moveBackwardAction,
      moveForward: moveForwardAction,
      drop: dropAction,
      dropFinished: dropFinishedAction,
      cancel: cancelAction,
    };

    const makeMapStateToProps = () => {
      const selector = makeSelector(provide);

      const mapStateToProps = (state, props) =>
        selector(state, props);

      return mapStateToProps;
    };

    return connect(makeMapStateToProps, mapDispatchToProps, null, { storeKey })(Draggable);
  };
