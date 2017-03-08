// @flow
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import { currentDragSelector } from '../../state/selectors';
import type { CurrentDrag, DraggableLocation, State } from '../../types';
import type {
  Provide,
  NeedsProviding,
  MapProps,
  OwnProps,
} from './droppable-types';

export default (provide: Provide) => {
  const memoizedProvide = memoizeOne(provide, isShallowEqual);
  const getProvided = (state: State, ownProps: OwnProps) => memoizedProvide(ownProps);

  return createSelector(
    [currentDragSelector, getProvided],
    (currentDrag: ?CurrentDrag, provided: NeedsProviding): MapProps => {
      const { id, isDropEnabled = true } = provided;

      if (!currentDrag || !isDropEnabled) {
        return {
          id,
          isDraggingOver: false,
        };
      }

      const destination: ?DraggableLocation = currentDrag.impact.destination;
      const isDraggingOver = Boolean(
        destination &&
        destination.droppableId === provided.id
      );

      return {
        id,
        isDraggingOver,
      };
    }
  );
};
