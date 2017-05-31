// @flow
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { connect } from 'react-redux';
import invariant from 'invariant';
import { createSelector } from 'reselect';
import { currentDragSelector, dragCompleteSelector } from '../../state/selectors';
import makeDraggable from './make-draggable';
import storeKey from '../../state/get-store-key';
import {
  lift as liftAction,
  move as moveAction,
  moveForward as moveForwardAction,
  moveBackward as moveBackwardAction,
  drop as dropAction,
  cancel as cancelAction,
  dropAnimationFinished as dropAnimationFinishedAction,
} from '../../state/action-creators';
import type {
  TypeId,
  State,
  Position,
  DraggableId,
  DragComplete,
  CurrentDrag,
} from '../../types';
import type {
  Provide,
    MapProps,
    OwnProps,
    DispatchProps,
    Props,
    MapState,
    NeedsProviding,
} from './draggable-types';

const empty = {};
const origin = { x: 0, y: 0 };

const makeSelector = (provide: Provide) => {
  const memoizedProvide = memoizeOne(provide, isShallowEqual);
  const getProvided = (state: State, ownProps: OwnProps) => memoizedProvide(ownProps);
  const memoizedOffset = memoizeOne(
    (x: number, y: number): Position => ({
      x, y,
    })
  );

  // Technically memoization is not needed for `getDefaultProps`
  // or `cutOffAnimation` : but it will make any shallow equality
  // checks faster as it can just compare the root
  const getDefaultProps = memoizeOne(
    (id: DraggableId, isDragEnabled: boolean): MapProps => ({
      id,
      isDragEnabled,
      isDropAnimating: false,
      isDragging: false,
      canAnimate: true,
      offset: origin,
    }));

  const cutOffAnimation = memoizeOne(
    (id: DraggableId, isDragEnabled: boolean): MapProps => ({
      id,
      isDragEnabled,
      isDropAnimating: false,
      isDragging: false,
      canAnimate: false,
      offset: origin,
    }));

  return createSelector(
    [currentDragSelector, dragCompleteSelector, getProvided],
    (currentDrag: ?CurrentDrag,
      complete: ?DragComplete,
      provided: NeedsProviding): MapProps => {
      const { id, isDragEnabled = true } = provided;

      if (complete) {
        const last: CurrentDrag = complete.last;

        if (last.dragging.id === provided.id) {
          if (!complete.isWaitingForAnimation) {
            return cutOffAnimation(id, isDragEnabled);
          }

          // waiting for animation to finish
          return {
            ...getDefaultProps(id, isDragEnabled),
            isDropAnimating: true,
            offset: complete.newHomeOffset,
            // TODO: is this needed?
            initial: last.dragging.initial,
          };
        }

        const { impact: { movement } } = last;

        if (movement.draggables.includes(provided.id)) {
          // quickly cut off animation
          // is this needed?
          if (complete.isWaitingForAnimation) {
            return cutOffAnimation(id, isDragEnabled);
          }

          const amount = movement.isMovingForward ?
            -movement.amount : movement.amount;

          return {
            ...getDefaultProps(id, isDragEnabled),
            offset: memoizedOffset(0, amount),
          };
        }

        return getDefaultProps(id, isDragEnabled);
      }

      if (!currentDrag || !currentDrag.dragging) {
        return getDefaultProps(id, isDragEnabled);
      }

      // item is dragging
      if (currentDrag.dragging.id === id) {
        const offset = currentDrag.dragging.offset;
        const initial = currentDrag.dragging.initial;
        const canAnimate = currentDrag.dragging.shouldAnimate;

        invariant(isDragEnabled, 'drag cannot be disabled for the dragging item');

        return {
          id,
          isDragEnabled: true,
          isDragging: true,
          isDropAnimating: false,
          canAnimate,
          offset,
          initial,
        };
      }

      const { impact: { movement } } = currentDrag;

      if (movement.draggables.includes(id)) {
        const amount = movement.isMovingForward ?
          -movement.amount : movement.amount;

        return {
          ...getDefaultProps(id, isDragEnabled),
          offset: memoizedOffset(0, amount),
        };
      }

      return getDefaultProps(id, isDragEnabled);
    }
  );
};

const makeMapStateToProps = (provide: Provide) => {
  const selector = makeSelector(provide);
  return (state: State, props: OwnProps) => selector(state, props);
};

const mapDispatchToProps: DispatchProps = {
  lift: liftAction,
  move: moveAction,
  moveBackward: moveBackwardAction,
  moveForward: moveForwardAction,
  drop: dropAction,
  dropAnimationFinished: dropAnimationFinishedAction,
  cancel: cancelAction,
};

const mergeProps = (mapProps: MapProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps): Props => ({
    mapProps,
    dispatchProps,
    ownProps,
  });

export default (type: TypeId,
  provide: Provide,
  map?: MapState = () => empty) =>
  (Component: any) => {
    const Draggable = makeDraggable(type, map)(Component);
    return connect(
      makeMapStateToProps(provide),
      mapDispatchToProps,
      mergeProps,
      { storeKey }
    )(Draggable);
  };

