// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import invariant from 'invariant';
import type {
  DraggableId,
    TypeId,
    Position,
    DraggingInitial,
} from '../../types';
import type { Provide } from './types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import type { Speed } from '../moveable';
import createDragHandle from './create-drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getDisplayName from '../get-display-name';
import storeKey from '../../state/get-store-key';
import makeSelector from './make-selector';

import {
  lift as liftAction,
  move as moveAction,
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

type MapProps = {|
  id: DraggableId,
  isDragEnabled: boolean,
  isDragging: boolean,
  isAnimationEnabled: boolean,
  offset?: Position,
  initial?: DraggingInitial,
|}

type DispatchProps = {|
  lift: typeof liftAction,
  move: typeof moveAction,
  drop: typeof dropAction,
  dropFinished: typeof dropFinishedAction,
  move: typeof moveAction,
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
  isAnimationEnabled: boolean) => {
  if (!isAnimationEnabled) {
    return {
      speed: 'NONE',
      zIndex: 'auto',
    };
  }

  if (isDragging) {
    return {
      speed: 'NONE',
      zIndex: '100',
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
      static displayName = `Draggable(${getDisplayName(Component)})`

      /* eslint-disable react/sort-comp */
      props: Props
      defaultProps: DefaultProps
      state: ComponentState
      handle: Function

      state: ComponentState = {
        wasDragging: false,
        ref: null,
      }

      static defaultProps = {
        offset: nowhere,
      }
      /* eslint-enable */

      constructor(props, context) {
        super(props, context);

        this.handle = createDragHandle(this.onLift, this.onMove, this.onDrop, this.onCancel);
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

        // TODO: hook: onDragEnd(id);
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

      onDrop = () => {
        const { id, drop } = this.props;

        drop(id);
      }

      onCancel = () => {
        console.log('cancelling drag');
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
        const handle = this.handle(this.props.isDragEnabled);

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

        const movement: Movement = getMovement(this.props.isDragging, this.state.wasDragging, this.props.isAnimationEnabled);

        console.log('rendering with animation:', this.props.isAnimationEnabled);

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
