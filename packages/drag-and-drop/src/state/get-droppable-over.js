// @flow
import type { DroppableId, Position, DimensionMap } from '../types';
import isInsideDroppable from './is-inside-droppable';

export default (
  target: Position,
  droppableDimensions: DimensionMap
): ?DroppableId => {
  const maybeId: ?DroppableId = Object.keys(droppableDimensions)
    .find(key => isInsideDroppable(target, droppableDimensions[key]));

  return maybeId || null;
};
