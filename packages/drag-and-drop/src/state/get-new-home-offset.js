// @flow
import type { DragMovement, Position } from '../types';

// Returns the offset required to move an item from its
// original position to its final reseting position
export default (movement: DragMovement): Position => {
  const amount: number = movement.isMovingForward ?
    movement.amount : -movement.amount;

  const itemsMoved: number = movement.draggables.length;

  // currently not considering horizontal movement
  const offset: Position = {
    x: 0,
    y: amount * itemsMoved,
  };

  return offset;
};
