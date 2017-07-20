// @flow
import type {
  DragMovement,
  Position,
  DraggableDimension,
  DraggableDimensionMap,
  DraggableId,
} from '../types';

const origin: Position = { x: 0, y: 0 };

// Returns the offset required to move an item from its
// original position to its final reseting position
export default (
  movement: DragMovement,
  currentOffset: Position,
  draggableDimensions: DraggableDimensionMap,
): Position => {
  // Just animate back to where it started
  if (!movement.draggables.length) {
    return origin;
  }

  const distance: number = movement.draggables.reduce(
    (previous: number, draggableId: DraggableId): number => {
      const dimension: DraggableDimension = draggableDimensions[draggableId];
      return previous + dimension.page.withMargin.height;
    }, 0);

  const amount: number = origin.y + (movement.isMovingForward ? distance : -distance);

  // Currently not considering horizontal movement
  const verticalChange: Position = {
    x: 0,
    y: amount,
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
