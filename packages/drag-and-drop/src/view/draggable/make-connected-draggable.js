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
  dropFinished as dropFinishedAction,
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
      isDragging: false,
      canAnimate: true,
    }));

  const cutOffAnimation = memoizeOne(
    (id: DraggableId, isDragEnabled: boolean): MapProps => ({
      id,
      isDragEnabled,
      isDragging: false,
      canAnimate: false,
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
          if (complete.isAnimationFinished) {
            return cutOffAnimation(id, isDragEnabled);
          }

          return {
            ...getDefaultProps(id, isDragEnabled),
            offset: complete.newHomeOffset,
            // TODO: is this needed?
            initial: last.dragging.initial,
          };
        }

        const { impact: { movement } } = last;

        if (movement.draggables.includes(provided.id)) {
          if (complete.isAnimationFinished) {
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

      if (currentDrag.dragging.id === id) {
        const offset = currentDrag.dragging.offset;
        const initial = currentDrag.dragging.initial;
        const canAnimate = currentDrag.dragging.shouldAnimate;

        invariant(isDragEnabled, 'drag cannot be disabled for the dragging item');

        return {
          id,
          isDragEnabled: true,
          isDragging: true,
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
  dropFinished: dropFinishedAction,
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

