// @flow
import type { Position, DroppableDimension } from '../types';

export default (target: Position, dimension: DroppableDimension): boolean => {
  const { top, right, bottom, left } = dimension.withMargin;

  return target.x >= left &&
    target.x <= right &&
    target.y >= top &&
    target.y <= bottom;
};
