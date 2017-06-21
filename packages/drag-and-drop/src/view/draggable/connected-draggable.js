// @flow
import memoizeOne from 'memoize-one';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  dragSelector,
  pendingDropSelector,
  phaseSelector,
} from '../../state/selectors';
import Draggable from './draggable';
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
  State,
  Position,
  DraggableId,
  DragState,
  PendingDrop,
  Phase,
  DragMovement,
} from '../../types';
import type {
  MapProps,
  OwnProps,
  DispatchProps,
} from './draggable-types';

const origin = { x: 0, y: 0 };

export const makeSelector = () => {
  const idSelector = (state: State, ownProps: OwnProps) => ownProps.draggableId;
  const isDragEnabledSelector = (state: State, ownProps) => ownProps.isDragEnabled || true;

  const memoizedOffset = memoizeOne(
    (x: number, y: number): Position => ({
      x, y,
    })
  );

  // Technically memoization is not needed for `getDefaultProps`
  // or `cutOffAnimation` : but it will make any shallow equality
  // checks faster as it can just compare the root
  const getDefaultProps = memoizeOne(
    (isDragEnabled: boolean): MapProps => ({
      isDragEnabled,
      isDropAnimating: false,
      isDragging: false,
      canAnimate: true,
      offset: origin,
      initial: null,
    }));

  const getWithMovement = memoizeOne(
    (offset: Position, isDragEnabled: boolean): MapProps => ({
      isDragEnabled,
      isDropAnimating: false,
      isDragging: false,
      canAnimate: true,
      offset,
      initial: null,
    })
  );

  const getNotDraggingProps = memoizeOne(
    (draggableId: DraggableId, movement: DragMovement, isDragEnabled: boolean): MapProps => {
      const needsToMove = movement.draggables.indexOf(draggableId) !== -1;

      if (!needsToMove) {
        return getDefaultProps(isDragEnabled);
      }

      const amount = movement.isMovingForward ? -movement.amount : movement.amount;

      return getWithMovement(
        // currently not handling horizontal movement
        memoizedOffset(0, amount),
        isDragEnabled,
      );
    }
  );

  return createSelector(
    [
      phaseSelector,
      dragSelector,
      pendingDropSelector,
      idSelector,
      isDragEnabledSelector,
    ],
    (phase: Phase,
      drag: ?DragState,
      pending: ?PendingDrop,
      id: DraggableId,
      isDragEnabled: boolean,
    ): MapProps => {
      if (phase === 'DRAGGING') {
        if (!drag) {
          console.error('invalid dragging state');
          return getDefaultProps(isDragEnabled);
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
          return getDefaultProps(isDragEnabled);
        }

        if (pending.last.current.id !== id) {
          return getNotDraggingProps(
            id,
            pending.last.impact.movement,
            isDragEnabled,
          );
        }

        return {
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
          isDragEnabled,
          offset: origin,
          isDropAnimating: false,
          isDragging: false,
          canAnimate: false,
          initial: null,
        };
      }

      // All unhandled phases
      return getDefaultProps(isDragEnabled);
    }
  );
};

const makeMapStateToProps = () => {
  const selector = makeSelector();
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

export default connect(
  makeMapStateToProps(),
  mapDispatchToProps,
  null,
  { storeKey }
)(Draggable);

