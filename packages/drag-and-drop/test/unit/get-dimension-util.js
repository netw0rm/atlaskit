// @flow
import type { Dimension, DimensionFragment } from '../../src/types';

let count = 0;

export default ({
  id = `item-${++count}`,
  top = 0,
  bottom = 100,
  left = 0,
  right = 100,
  margin = 0,
}: Object = {}): Dimension => {
  const withoutMargin: DimensionFragment = {
    top,
    left,
    bottom,
    right,
    height: bottom - top,
    width: right - left,
  };
  const withMargin: DimensionFragment = {
    top: top + margin,
    left: left + margin,
    bottom: bottom + margin,
    right: right + margin,
    height: (bottom + margin) - (top + margin),
    width: (right + margin) - (left + margin),
  };

  return {
    id,
    withoutMargin,
    withMargin,
    // not considering margin in center position
    center: {
      x: (left + right) / 2,
      y: (top + bottom) / 2,
    },
  };
};
