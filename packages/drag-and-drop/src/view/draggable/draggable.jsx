// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import invariant from 'invariant';
import type {
  TypeId,
    Position,
} from '../../types';
import type { Provide, MapProps, OwnProps } from './draggable-types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import KeepVisible from '../keep-visible';
import type { Speed } from '../moveable';
import createDragHandle from './create-drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getDisplayName from '../get-display-name';
import storeKey from '../../state/get-store-key';
import makeSelector from './make-draggable-selector';

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

type MapState = (state: DraggableState, ownProps: OwnProps, getDragHandle: Function) => Object;
const empty = {};
const identity = x => x;
const noWhere: Position = { x: 0, y: 0 };

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

type Props = {
  mapProps: MapProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps,
}

type ComponentState = {|
  wasDragging: boolean,
  ref: ?Element
|}

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
      state: ComponentState
      getHandle: Function

      state: ComponentState = {
        wasDragging: false,
        ref: null,
      }

      static displayName = `Draggable(${getDisplayName(Component)})`

      static defaultProps = {
        offset: noWhere,
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
        const wasDragging = this.props.mapProps.isDragging &&
          !nextProps.mapProps.isDragging;

        if (this.state.wasDragging !== wasDragging) {
          this.setState({
            wasDragging,
          });
        }
      }

      componentWillUnmount() {
        // console.warn('unmounting draggable', this.props.id);
      }

      onMoveEnd = () => {
        if (!this.state.wasDragging) {
          return;
        }

        const { mapProps: { id }, dispatchProps: { dropFinished } } = this.props;

        dropFinished(id);
      }

      onLift = (selection: Position) => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const {
          mapProps: { id, isDragEnabled },
          dispatchProps: { lift },
        } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.ref);

        lift(id, type, center, scroll, selection);
      }

      onKeyLift = () => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const {
          mapProps: { id, isDragEnabled },
          dispatchProps: { lift },
        } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.ref);

        // using center position as selection
        lift(id, type, center, scroll, center);
      }

      onMove = (point: Position) => {
        invariant(this.state.ref, 'cannot move when there is no ref');

        const {
          mapProps: { id, isDragEnabled, initial },
          dispatchProps: { move },
        } = this.props;

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
        const {
          mapProps: { id },
          dispatchProps: { moveForward },
        } = this.props;

        moveForward(id);
      }

      onMoveBackward = () => {
        const {
          mapProps: { id },
          dispatchProps: { moveBackward },
         } = this.props;

        moveBackward(id);
      }

      onDrop = () => {
        const {
          mapProps: { id },
          dispatchProps: { drop },
         } = this.props;

        drop(id);
      }

      onCancel = () => {
        const {
          mapProps: { id },
          dispatchProps: { cancel },
         } = this.props;

        cancel(id);
      }

      setRef = (ref: ?Element) => {
        // need to trigger a child render when ref changes
        this.setState({
          ref,
        });
      }

      render() {
        const { mapProps, ownProps } = this.props;

        console.log('rendering draggable', mapProps.id);

        const movement: Movement = getMovement(
          mapProps.isDragging,
          this.state.wasDragging,
          mapProps.canAnimate
        );

        const handle = this.getHandle(mapProps.isDragEnabled);

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return handle;
        };

        const snapshot: DraggableState = {
          isDragging: mapProps.isDragging,
        };

        const additionalProps = map(snapshot, ownProps, requestDragHandle);

        const enhancedOwnProps = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : handle;

        return (
          <Moveable
            speed={movement.speed}
            zIndex={movement.zIndex}
            destination={mapProps.offset}
            onMoveEnd={this.onMoveEnd}
            innerRef={this.setRef}
          >
            {wrap(
              <DraggableDimensionPublisher
                itemId={mapProps.id}
                type={type}
                outerRef={this.state.ref}
              >
                <KeepVisible itemId={mapProps.id}>
                  <Container
                    isDragging={mapProps.isDragging}
                  >
                    <Component {...enhancedOwnProps} />
                  </Container>
                </KeepVisible>
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

    const mergeProps = (mapProps: MapProps,
      dispatchProps: DispatchProps,
      ownProps: OwnProps): Props => ({
        mapProps,
        dispatchProps,
        ownProps,
      });

    return connect(makeMapStateToProps, mapDispatchToProps, mergeProps, { storeKey })(Draggable);
  };
