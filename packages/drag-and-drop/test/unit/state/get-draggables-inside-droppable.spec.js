// @flow
import { describe, it } from 'mocha';
import { expect } from 'chai';
import getDraggablesInsideDroppable from '../../../src/state/get-draggables-inside-droppable';
import getDimension from '../get-dimension-util';
import type { Dimension, DimensionMap } from '../../../src/types';

describe('get draggables inside a droppable', () => {
  const droppable: Dimension = getDimension({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  });

  const inside: Dimension[] = [
    getDimension({
      top: 20,
      left: 20,
      right: 80,
      bottom: 80,
    }),
    getDimension({
      top: 30,
      left: 30,
      right: 70,
      bottom: 70,
    }),
  ];
  const outside: Dimension[] = [
    getDimension({
      top: 200,
      left: 200,
      right: 300,
      bottom: 400,
    }),
  ];

  const draggables: DimensionMap = inside
    .concat(outside)
    .reduce((previous: DimensionMap, current: Dimension): DimensionMap => {
      previous[current.id] = current;
      return previous;
    }, {});

  it('should only return dimensions that are inside a droppable', () => {
    const result: Dimension[] = getDraggablesInsideDroppable(droppable, draggables);
    expect(result).to.deep.equal(inside);
  });

  // other edge cases tested in get-inside-dimension
});
