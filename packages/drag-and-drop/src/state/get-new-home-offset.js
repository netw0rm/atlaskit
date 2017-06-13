// @flow
import type { DragMovement, Position } from '../types';

const origin: Position = {
  x: 0,
  y: 0,
};

// Returns the offset required to move an item from its
// original position to its final reseting position
export default (
  movement: DragMovement,
  currentOffset: Position,
): Position => {
  // Just animate back to where it started
  if (!movement.draggables.length) {
    return origin;
  }

  const amount: number = movement.isMovingForward ?
    movement.amount : -movement.amount;

  const itemsMoved: number = movement.draggables.length;

  // Currently not considering horizontal movement
  const verticalChange: Position = {
    x: 0,
    y: amount * itemsMoved,
  };

  // Difference between the pure vertical change
  // and where we are now (currentOffset)
  const diff: Position = {
    x: 0,
    y: currentOffset.y - verticalChange.y,
  };

  // Final offset is
  const newHomeOffset: Position = {
    x: 0,
    y: currentOffset.y - diff.y,
  };

  return newHomeOffset;
};
