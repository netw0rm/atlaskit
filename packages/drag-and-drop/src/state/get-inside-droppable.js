// @flow
import memoizeOne from 'memoize-one';
import type { DimensionMap, Dimension, Id } from '../types';
import isInsideDimension from './is-inside-dimension';

export default memoizeOne(
  (droppableDimension, draggableDimensions: DimensionMap): Dimension[] =>
    Object.keys(draggableDimensions)
      .map((key: Id): Dimension => draggableDimensions[key])
      .filter((dimension: Dimension): boolean =>
        dimension.droppableId === droppableDimension.id
      )
      // dimensions might not be sorted (which is true after a reorder)
      .sort((a: Dimension, b: Dimension): number => a.center.y - b.center.y)
);
