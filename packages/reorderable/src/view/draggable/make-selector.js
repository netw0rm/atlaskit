import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { createSelector } from 'reselect';
import invariant from 'invariant';
import { currentDragSelector, dragCompleteSelector } from '../../state/selectors';
import type { Provide, NeedsProviding } from './types';
import type { DragComplete, CurrentDrag } from '../../types';

export default (provide: Provide) => {
  const memoizedProvide = memoizeOne(provide, isShallowEqual);
  const getProvided = (state, ownProps) => memoizedProvide(ownProps);

  return createSelector(
    [currentDragSelector, dragCompleteSelector, getProvided],
    (currentDrag: ?CurrentDrag,
      complete: ?DragComplete,
      provided: NeedsProviding): MapProps => {
      const { id, isDragEnabled = true } = provided;

      if (complete) {
        const last: CurrentDrag = complete.last;

        if (complete.isAnimationFinished) {
          return {
            id,
            isDragEnabled,
            isDragging: false,
            isAnimationEnabled: false,
          };
        }

        // 1. was the draggable moving out of the way?

        if (last.impact.movement.draggables.includes(provided.id)) {
          return {
            id,
            isDragEnabled,
            isDragging: false,
            isAnimationEnabled: true,
            offset: {
              x: 0,
              y: last.impact.movement.amount,
            },
          };
        }

        if (last.dragging.id === provided.id) {
          return {
            id,
            isDragEnabled,
            isDragging: false,
            isAnimationEnabled: true,
            offset: complete.newHomeOffset,
            initial: last.initial,
          };
        }

        return {
          id,
          isDragEnabled,
          isDragging: false,
          isAnimationEnabled: true,
        };
      }

      if (!currentDrag || !currentDrag.dragging) {
        return {
          id,
          isDragEnabled,
          isDragging: false,
          isAnimationEnabled: true,
        };
      }

      if (currentDrag.dragging.id === id) {
        const offset = currentDrag.dragging.offset;
        const initial = currentDrag.dragging.initial;

        invariant(isDragEnabled, 'drag cannot be disabled for the dragging item');

        return {
          id,
          isDragEnabled: true,
          isDragging: true,
          offset,
          initial,
          isAnimationEnabled: true,
        };
      }

      // not the one being dragged - but might still be mvoing

      if (currentDrag.impact.movement.draggables.includes(id)) {
        return {
          id,
          isDragEnabled,
          isDragging: false,
          isAnimationEnabled: true,
          offset: {
            x: 0,
            y: currentDrag.impact.movement.amount,
          },
        };
      }

      return {
        id,
        isDragEnabled,
        isDragging: false,
        isAnimationEnabled: true,
      };
    }
  );
};

