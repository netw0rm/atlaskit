// @flow
import type { Dimension } from '../../src/types';

let count = 0;

export default ({
  id = `item-${++count}`,
  top = 0,
  bottom = 100,
  left = 0,
  right = 100,
  margin = 0,
}: Object = {}): Dimension => {
  const height = (top + margin) + (bottom + margin);
  const width = (left + margin) + (right + margin);
  const dimension: Dimension = {
    id,
    top: top + margin,
    bottom: bottom + margin,
    left: left + margin,
    right: right + margin,
    // not considering margin in center position
    center: {
      x: (left + right) / 2,
      y: (top + bottom) / 2,
    },
    height,
    width,
  };

  return dimension;
};
