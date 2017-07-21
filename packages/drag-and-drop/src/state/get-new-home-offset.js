// @flow
import type {
  DragMovement,
  Position,
  DraggableDimension,
  DraggableDimensionMap,
  DraggableId,
} from '../types';
import { add, subtract } from './position';

type NewHomeArgs = {|
  movement: DragMovement,
  clientOffset: Position,
  pageOffset: Position,
  scrollDiff: Position,
  draggables: DraggableDimensionMap,
|}

// Returns the offset required to move an item from its
// original position to its final reseting position
export default ({
  movement,
  clientOffset,
  pageOffset,
  scrollDiff,
  draggables,
}: NewHomeArgs): Position => {
  // Just animate back to where it started
  if (!movement.draggables.length) {
    return scrollDiff;
  }

  // Currently not considering horizontal movement
  const distance: number = movement.draggables.reduce(
    (previous: number, draggableId: DraggableId): number => {
      const dimension: DraggableDimension = draggables[draggableId];
      return previous + dimension.page.withMargin.height;
    }, 0);

  const amount: number = movement.isMovingForward ? distance : -distance;

  // result = total change - pageOffset + clientOffset

  const verticalChange: Position = {
    x: 0,
    y: amount,
  };

  return add(add(subtract(verticalChange, pageOffset), clientOffset), scrollDiff);
};
