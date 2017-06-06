// @flow
import memoizeOne from 'memoize-one';
import type { DimensionMap, Dimension, Id } from '../types';
import isInsideDimension from './is-inside-dimension';

export default memoizeOne(
  (droppableDimension, draggableDimensions: DimensionMap): Dimension[] =>
    Object.keys(draggableDimensions)
      .map((key: Id): Dimension => draggableDimensions[key])
      .filter((dimension: Dimension): boolean => isInsideDimension(dimension.center, droppableDimension))
      // Dimensions might not be sorted.
      // Not sure when this will occur
      // TODO: investigate
      // .sort((a: Dimension, b: Dimension): number => a.center.y - b.center.y)
  );
