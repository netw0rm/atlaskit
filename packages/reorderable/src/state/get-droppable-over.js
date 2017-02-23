// @flow
import type { Position } from './types';
import type { DroppableId, DimensionMap } from '../types';

export default (target: Position,
draggableDimensions: DimensionMap,
droppableDimensions: DimensionMap): ?DroppableId => {
  const maybeId: ?DroppableId = Object.keys(droppableDimensions).find((key) => {
    const { top, right, bottom, left } = droppableDimensions[key];

    return target.x > left &&
            target.x < right &&
            target.y > top &&
            target.y < bottom;
  });

  return maybeId;
};
