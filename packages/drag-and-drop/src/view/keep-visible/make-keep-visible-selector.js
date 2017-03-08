// @flow
import { createSelector } from 'reselect';
import { currentDragSelector, draggableDimensionsSelector } from '../../state/selectors';
import type { ConnectedProps, MapProps } from './keep-visible-types';
import type { State, CurrentDrag, DraggableId, Dimension, DimensionMap } from '../../types';

const idSelector = (state: State, props: ConnectedProps): DraggableId => props.itemId;

const dimensionSelector = createSelector(
  [draggableDimensionsSelector, idSelector],
  (dimensions: ?DimensionMap, id: DraggableId): ?Dimension => {
    if (!dimensions) {
      return null;
    }
    return dimensions[id];
  }
);

const empty: MapProps = {
  dimension: null,
  currentDrag: null,
};

export default () => createSelector(
  [dimensionSelector, currentDragSelector, idSelector],
  (dimension: ?Dimension, currentDrag: ?CurrentDrag, id: DraggableId): MapProps => {
    if (!currentDrag ||
      !currentDrag.dragging ||
      currentDrag.dragging.id !== id ||
      !currentDrag.dragging.shouldAnimate) {
      return empty;
    }

    return {
      dimension,
      currentDrag,
    };
  }
);
