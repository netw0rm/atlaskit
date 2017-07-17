// @flow
import memoizeOne from 'memoize-one';
import type { DimensionMap, Dimension, Id } from '../types';

export default memoizeOne(
  (droppableDimension, draggableDimensions: DimensionMap): Dimension[] =>
    Object.keys(draggableDimensions)
      .map((key: Id): Dimension => draggableDimensions[key])
      .filter((dimension: Dimension): boolean => dimension.parentId === droppableDimension.id)
      // Dimensions are not guarenteed to be ordered in the same order as keys
      // So we need to sort them so they are in the correct order
      .sort((a: Dimension, b: Dimension): number => a.center.y - b.center.y)
  );
