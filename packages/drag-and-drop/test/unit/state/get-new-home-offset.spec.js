// @flow
import { describe, it } from 'mocha';
import { expect } from 'chai';
import getNewHomeOffset from '../../../src/state/get-new-home-offset';
import type { DragMovement, Position } from '../../../src/types';

describe('get new home offset', () => {
  it('should return the height draggable * the number of items that have moved', () => {
    const movement: DragMovement = {
      draggables: ['drag-2', 'drag-3'],
      amount: 100,
      isMovingForward: true,
    };

    const result: Position = getNewHomeOffset(movement);

    expect(result).to.deep.equal({
      x: 0,
      y: movement.amount * movement.draggables.length,
    });
  });

  it('should return a postive value when the draggable is moving forward', () => {

  });

  it('should return a negative value when the draggable is moving backwards', () => {

  });
});
