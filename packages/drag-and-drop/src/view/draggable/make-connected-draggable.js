// @flow
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  currentDragSelector,
  initialDragSelector,
  dragImpactSelector,
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
  InitialDrag,
  CurrentDrag,
  PendingDrop,
  Phases,
  DragMovement,
  DragImpact,
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
      currentDragSelector,
      initialDragSelector,
      dragImpactSelector,
      pendingDropSelector,
      getProvided],
    (phase: Phases,
      current: ?CurrentDrag,
      initial: ?InitialDrag,
      impact: ?DragImpact,
      pendingDrop: ?PendingDrop,
      provided: NeedsProviding): MapProps => {
      const { id, isDragEnabled = true } = provided;

      // // TODO: write test
      // if (currentDrag && complete) {
      //   console.error('cannot be dragging and have a complete drag');
      //   return getDefaultProps(id, isDragEnabled);
      // }
      if (phase === 'IDLE' || phase === 'COLLECTING_DIMENSIONS') {
        return getDefaultProps(id, isDragEnabled);
      }

      if (phase === 'DRAGGING') {
        if (!current || !initial || !impact) {
          console.error('invalid dragging state');
          return getDefaultProps(id, isDragEnabled);
        }

        if (current.id !== id) {
          return getNotDraggingProps(
            id,
            impact.movement,
            isDragEnabled,
          );
        }

        // Scenario: this item is dragging
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

      return getDefaultProps(id, isDragEnabled);

      // Scenario 5: there was a drag, but it was not this item
      // if (complete.last.dragging.id !== id) {
      //   return getNotDraggingProps(
      //     id,
      //     complete.last.impact.movement,
      //     isDragEnabled,
      //   );
      // }

      // // Scenario: just dropped this item
      // const isDropAnimating = complete.isWaitingForAnimation;
      // return {
      //   id,
      //   isDragEnabled,
      //   isDragging: false,
      //   isDropAnimating,
      //   canAnimate: isDropAnimating,
      //   offset: complete.newHomeOffset,
      //   initial: complete.last.initial,
      // };
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

