// @flow
import { describe, it } from 'mocha';
import { expect } from 'chai';
import getNewHomeOffset from '../../../src/state/get-new-home-offset';
import noImpact from '../../../src/state/no-impact';
import type { DragMovement, Position } from '../../../src/types';

const origin: Position = {
  x: 0,
  y: 0,
};

describe('get new home offset', () => {
  it('should return to the start position (origin) if nothing has moved', () => {
    const result: Position = getNewHomeOffset(noImpact.movement, { x: 100, y: 200 });

    expect(result).to.deep.equal(origin);
  });

  it('should return new position required to move to', () => {
    // 'drag-1' is moving forward two places and a bit to the left
    /*
                      ----------------       ----------------
    center: (50,50)   |--- item-1 ---|   ->  |--- item-2 ---|     center: (50,50)
    offset: (0,0)     ----------------       ----------------     offset: (0,-100)
                      ----------------       ----------------
    center: (50,150)  |--- item-2 ---|       |--- item-3 ---|     center: (50,150)
    offset: (0,0)     ----------------       ----------------     offset: (0,-100)
                      ----------------
    center: (50,250)  |--- item-3 ---|            /   Need to get to:
    offset: (0,0)     ----------------           /    center: (50,250)
                                                /     offset: ( 0,200)
                                    ----------------
                center: ( 25,300)   |--- item-1 ---|
                offset: (-25,250)   ----------------
    */
    // Moving down past two items, and a bit too far vertically and to the left
    const finishOffset: Position = {
      x: -25,
      y: 250,
    };
    // Need to move a bit less forward to be in effectively [center: (0,300)]
    const goal: Position = {
      x: 0,
      y: 200,
    };
    const movement: DragMovement = {
      draggables: ['drag-2', 'drag-3'],
      amount: 100,
      isMovingForward: true,
    };

    const result: Position = getNewHomeOffset(movement, finishOffset);

    expect(result).to.deep.equal(goal);
  });

  it('should return a negative value when the draggable is moving backwards', () => {
    // Same example as above, but moving item-3 to far up and to the right
    const finishOffset: Position = {
      x: 25,
      y: -250,
    };
    // Need to move a bit less forward to be in effectively [center: (0,300)]
    const goal: Position = {
      x: 0,
      y: -200,
    };
    const movement: DragMovement = {
      draggables: ['drag-2', 'drag-3'],
      amount: 100,
      isMovingForward: false,
    };

    const result: Position = getNewHomeOffset(movement, finishOffset);

    expect(result).to.deep.equal(goal);
  });
});
