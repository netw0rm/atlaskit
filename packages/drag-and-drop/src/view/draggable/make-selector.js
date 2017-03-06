// @flow
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { createSelector } from 'reselect';
import invariant from 'invariant';
import { currentDragSelector, dragCompleteSelector } from '../../state/selectors';
import type { Provide, NeedsProviding, MapProps } from './types';
import type { DraggableId, DragComplete, CurrentDrag, Position } from '../../types';

export default (provide: Provide) => {
  const memoizedProvide = memoizeOne(provide, isShallowEqual);
  const getProvided = (state, ownProps) => memoizedProvide(ownProps);
  const memoizedOffset = memoizeOne(
    (x: number, y: number): Position => ({
      x, y
    })
  );

  // Technically memoization is not needed for `getDefaultProps`
  // or `cutOffAnimation` : but it will make any shallow equality
  // checks faster as it can just compare the root
  const getDefaultProps = memoizeOne((id: DraggableId, isDragEnabled: boolean): MapProps => ({
    id,
    isDragEnabled,
    isDragging: false,
    canAnimate: true,
  }));

  const cutOffAnimation = memoizeOne((id: DraggableId, isDragEnabled: boolean): MapProps => ({
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

        if (last.impact.movement.draggables.includes(provided.id)) {
          if (complete.isAnimationFinished) {
            return cutOffAnimation(id, isDragEnabled);
          }

          return {
            ...getDefaultProps(id, isDragEnabled),
            offset: memoizedOffset(0, last.impact.movement.amount),
          };
        }

        return getDefaultProps(id, isDragEnabled);
      }

      if (!currentDrag || !currentDrag.dragging) {
        return getDefaultProps(id, isDragEnabled)
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

      if (currentDrag.impact.movement.draggables.includes(id)) {
        return {
          ...getDefaultProps(id, isDragEnabled),
          offset: memoizedOffset(0, currentDrag.impact.movement.amount),
        };
      }

      return getDefaultProps(id, isDragEnabled);
    }
  );
};
