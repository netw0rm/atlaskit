// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import invariant from 'invariant';
import memoizeOne from 'memoize-one';
import { createSelector } from 'reselect';
import isShallowEqual from 'shallowequal';
import type {
  DraggableId,
    TypeId,
    Position,
    DraggingInitial,
    DragComplete,
    CurrentDrag,
} from '../../types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import type { Speed } from '../moveable';
import createDragHandle from './create-drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getOffset from '../get-offset';
import getDisplayName from '../get-display-name';
import storeKey from '../../state/get-store-key';
import { currentDragSelector, dragCompleteSelector } from '../../state/selectors';

import {
  lift as liftAction,
  move as moveAction,
  drop as dropAction,
  cancel as cancelAction,
  dropFinished as dropFinishedAction,
} from '../../state/action-creators';

type NeedsProviding = {|
  id: DraggableId,
    isDragEnabled ?: boolean,
|}

type DraggableState = {|
  isDragging: boolean
    |}

type Provide = (ownProps: Object) => NeedsProviding;
type MapState = (state: DraggableState, ownProps: Object, getDragHandle: Function) => Object;
const empty = {};
const identity = x => x;
const nowhere: Position = { x: 0, y: 0 };

type Props = {|
  lift: typeof liftAction,
  move: typeof moveAction,
  drop: typeof dropAction,
  dropFinished: typeof dropFinishedAction,
  move: typeof moveAction,
  cancel: typeof cancelAction,
  provided: NeedsProviding,
  isDragging: boolean,
  isAnimationEnabled: boolean,
  offset: ?Position,
  initial: ?DraggingInitial,
|};

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

        const { provided: { id }, dropFinished } = this.props;

        // TODO: hook: onDragEnd(id);
        dropFinished(id);
      }

      onLift = (selection: Position) => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const { provided: { id, isDragEnabled }, lift } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        // const offset: Position = { x: 0, y: 0 };
        const scroll: Position = getScrollPosition();

        // $FlowFixMe
        const offset: Position = getOffset(this.state.ref);
        const center: Position = getCenterPosition(this.state.ref);

        lift(id, type, center, offset, scroll, selection);
      }

      onMove = (point: Position) => {
        const { provided: { id, isDragEnabled }, initial, move } = this.props;

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
        const diff: Position = {
          x: mouseDiff.x + scrollDiff.x,
          y: mouseDiff.y + scrollDiff.y,
        };

        // adjusted positions
        const offset: Position = {
          x: initial.offset.x + diff.x,
          y: initial.offset.y + diff.y,
        };
        const center: Position = {
          x: initial.center.x + diff.x,
          y: initial.center.y + diff.y,
        };

        move(id, offset, center);
      }

      onDrop = () => {
        const { provided: { id }, drop } = this.props;

        drop(id);
      }

      onCancel = () => {
        console.log('cancelling drag');
      }
      setRef = (ref: ?Element) => {
        // need to trigger a child render when ref changes
        console.log('DRAGGABLE: new ref', ref);
        this.setState({
          ref,
        });
      }

      componentWillUnmount() {
        console.warn('unmounting draggable', this.props.provided.id);
      }

      render() {
        const ownProps: Props = this.props;

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return this.handle;
        };

        const snapshot: DraggableState = {
          isDragging: ownProps.isDragging,
        };

        const additionalProps = map(snapshot, ownProps, requestDragHandle);

        // TODO: clear draggable props
        const props = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : this.handle;

        const { id: droppableId } = ownProps.provided;

        const movement: Movement = getMovement(ownProps.isDragging, this.state.wasDragging, ownProps.isAnimationEnabled);

        console.log('rendering with animation:', ownProps.isAnimationEnabled);

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
                itemId={droppableId}
                type={type}
                outerRef={this.state.ref}
              >
                <Container
                  isDragging={ownProps.isDragging}
                >
                  <Component {...props} />
                </Container>
              </DraggableDimensionPublisher>
            )}
          </Moveable>
        );
      }
    }

    const makeSelector = () => {
      const memoizedProvide = memoizeOne(provide, isShallowEqual);
      const getProvided = (state, ownProps) => memoizedProvide(ownProps);

      return createSelector(
        [currentDragSelector, dragCompleteSelector, getProvided],
        (currentDrag: ?CurrentDrag,
          complete: ?DragComplete,
          provided: NeedsProviding) => {
          if (complete) {
            if (complete.requestPublish) {
              return {
                provided,
                isDragging: false,
                isAnimationEnabled: false,
              };
            }

            // 1. was the draggable moving out of the way?
            const last: CurrentDrag = complete.last;

            if (last.impact.movement.draggables.includes(provided.id)) {
              return {
                provided,
                isDragging: false,
                offset: {
                  x: 0,
                  y: last.impact.movement.amount,
                },
                isAnimationEnabled: true,
              };
            }

            if (last.dragging.id === provided.id) {
              return {
                provided,
                isDragging: false,
                offset: complete.newHomeOffset,
                isAnimationEnabled: true,
              };
            }

            return {
              provided,
              isDragging: false,
              isAnimationEnabled: true,
            };
          }

          if (!currentDrag || !currentDrag.dragging) {
            return {
              provided,
              isDragging: false,
              isAnimationEnabled: true,
            };
          }

          if (currentDrag.dragging.id === provided.id) {
            const offset = currentDrag.dragging.offset;
            const initial = currentDrag.dragging.initial;

            return {
              provided,
              isDragging: true,
              offset,
              initial,
              isAnimationEnabled: true,
            };
          }

          // not the one being dragged - but might still be mvoing

          if (!currentDrag.impact.movement.draggables.includes(provided.id)) {
            return {
              provided,
              isDragging: false,
              isAnimationEnabled: true,
            };
          }

          return {
            provided,
            isDragging: false,
            offset: {
              x: 0,
              y: currentDrag.impact.movement.amount,
            },
            isAnimationEnabled: true,
          };
        }
      );
    };

    const makeMapStateToProps = () => {
      const selector = makeSelector();

      const mapStateToProps = (state, props) =>
        selector(state, props);

      return mapStateToProps;
    };

    const mapDispatchToProps = {
      lift: liftAction,
      move: moveAction,
      drop: dropAction,
      dropFinished: dropFinishedAction,
      cancel: cancelAction,
    };

    return connect(makeMapStateToProps, mapDispatchToProps, null, { storeKey })(Draggable);
  };
