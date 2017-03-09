// @flow
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { createSelector } from 'reselect';
import invariant from 'invariant';
import { currentDragSelector, dragCompleteSelector } from '../../state/selectors';
import type { Provide, NeedsProviding, MapProps, OwnProps } from './draggable-types';
import type { DraggableId, DroppableId, DragComplete, CurrentDrag, Position, State } from '../../types';

export default (provide: Provide) => {
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
    (id: DraggableId, droppableId: DroppableId, isDragEnabled: boolean): MapProps => ({
      id,
      isDragEnabled,
      droppableId,
      isDragging: false,
      canAnimate: true,
    }));

  const cutOffAnimation = memoizeOne(
    (id: DraggableId, droppableId: DroppableId, isDragEnabled: boolean): MapProps => ({
      id,
      isDragEnabled,
      droppableId,
      isDragging: false,
      canAnimate: false,
    }));

  return createSelector(
    [currentDragSelector, dragCompleteSelector, getProvided],
    (currentDrag: ?CurrentDrag,
      complete: ?DragComplete,
      provided: NeedsProviding): MapProps => {
      const { id, droppableId, isDragEnabled = true } = provided;

      if (complete) {
        const last: CurrentDrag = complete.last;

        if (last.dragging.id === provided.id) {
          if (complete.isAnimationFinished) {
            return cutOffAnimation(id, droppableId, isDragEnabled);
          }

          return {
            ...getDefaultProps(id, droppableId, isDragEnabled),
            offset: complete.newHomeOffset,
            // TODO: is this needed?
            initial: last.dragging.initial,
          };
        }

        const { impact: { movement } } = last;

        if (movement.draggables.includes(provided.id)) {
          if (complete.isAnimationFinished) {
            return cutOffAnimation(id, droppableId, isDragEnabled);
          }

          const amount = movement.isMovingForward ?
            -movement.amount : movement.amount;

          return {
            ...getDefaultProps(id, droppableId, isDragEnabled),
            offset: memoizedOffset(0, amount),
          };
        }

        return getDefaultProps(id, droppableId, isDragEnabled);
      }

      if (!currentDrag || !currentDrag.dragging) {
        return getDefaultProps(id, droppableId, isDragEnabled);
      }

      if (currentDrag.dragging.id === id) {
        const offset = currentDrag.dragging.offset;
        const initial = currentDrag.dragging.initial;
        const canAnimate = currentDrag.dragging.shouldAnimate;

        invariant(isDragEnabled, 'drag cannot be disabled for the dragging item');

        return {
          id,
          droppableId,
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
          ...getDefaultProps(id, droppableId, isDragEnabled),
          offset: memoizedOffset(0, amount),
        };
      }

      return getDefaultProps(id, droppableId, isDragEnabled);
    }
  );
};
