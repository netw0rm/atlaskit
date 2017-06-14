// @flow
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  dragSelector,
  pendingDropSelector,
  phaseSelector,
} from '../../state/selectors';
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
  DragState,
  PendingDrop,
  Phase,
  DragMovement,
} from '../../types';
import type {
  Provide,
  MapProps,
  OwnProps,
  DispatchProps,
  Props,
  MapStateToProps,
  NeedsProviding,
} from './draggable-types';

const empty = {};
const origin = { x: 0, y: 0 };

export const makeSelector = (provide: Provide) => {
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
      initial: null,
    }));

  const getWithMovement = memoizeOne(
    (id: DraggableId, offset: Position, isDragEnabled: boolean): MapProps => ({
      id,
      isDragEnabled,
      isDropAnimating: false,
      isDragging: false,
      canAnimate: true,
      offset,
      initial: null,
    })
  );

  const getNotDraggingProps = memoizeOne(
    (id: DraggableId, movement: DragMovement, isDragEnabled: boolean): MapProps => {
      const needsToMove = movement.draggables.indexOf(id) !== -1;

      if (!needsToMove) {
        return getDefaultProps(id, isDragEnabled);
      }

      const amount = movement.isMovingForward ? -movement.amount : movement.amount;

      return getWithMovement(
        id,
        // currently not handling horizontal movement
        memoizedOffset(0, amount),
        isDragEnabled,
      );
    }
  );

  return createSelector(
    [phaseSelector,
      dragSelector,
      pendingDropSelector,
      getProvided],
    (phase: Phase,
      drag: ?DragState,
      pending: ?PendingDrop,
      provided: NeedsProviding): MapProps => {
      const { id, isDragEnabled = true } = provided;

      if (phase === 'DRAGGING') {
        if (!drag) {
          console.error('invalid dragging state');
          return getDefaultProps(id, isDragEnabled);
        }

        const { current, initial, impact } = drag;

        if (current.id !== id) {
          return getNotDraggingProps(
            id,
            impact.movement,
            isDragEnabled,
          );
        }

        // this item is dragging
        const offset = current.offset;
        const canAnimate = current.shouldAnimate;

        // not memoizing result as it should not move without an update
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

      if (phase === 'DROP_ANIMATING') {
        if (!pending) {
          console.error('cannot animate drop without a pending drop');
          return getDefaultProps(id, isDragEnabled);
        }

        if (pending.last.current.id !== id) {
          return getNotDraggingProps(
            id,
            pending.last.impact.movement,
            isDragEnabled,
          );
        }

        return {
          id,
          isDragEnabled,
          isDragging: false,
          isDropAnimating: true,
          canAnimate: true,
          offset: pending.newHomeOffset,
          initial: pending.last.initial,
        };
      }

      if (phase === 'DROP_COMPLETE') {
        // Cut off all animation as the item is already reordered
        // If it is not everyone is going to have a bad time
        return {
          id,
          isDragEnabled,
          offset: origin,
          isDropAnimating: false,
          isDragging: false,
          canAnimate: false,
          initial: null,
        };
      }

      // All unhandled phases
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
  mapStateToProps?: MapStateToProps = () => empty) =>
  (Component: any) => {
    const Draggable = makeDraggable(type, mapStateToProps)(Component);
    return connect(
      makeMapStateToProps(provide),
      mapDispatchToProps,
      mergeProps,
      { storeKey }
    )(Draggable);
  };

