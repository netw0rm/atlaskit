// @flow
import type { Position } from './types';
import type { DroppableId, DimensionMap } from '../types';
import isInsideDimension from './is-inside-dimension';

export default (target: Position,
droppableDimensions: DimensionMap): ?DroppableId => {
  const maybeId: ?DroppableId = Object.keys(droppableDimensions)
    .find(key => isInsideDimension(target, droppableDimensions[key]));

  return maybeId;
};
