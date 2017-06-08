// @flow
import type {
  DraggableId,
  DraggableLocation,
  Dimension,
  DimensionMap,
  Position,
} from '../types';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';

const getDiff = (isMovingForward: boolean) => (
  currentIndex: number,
  draggableId: DraggableId,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?Position => {
  throw new Error('not yet implemented');

  const draggableDimension: Dimension = draggableDimensions[draggableId];
  // TODO: fix line
  const droppableDimension: Dimension = droppableDimensions[location.droppableId];

  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(
    droppableDimension,
    draggableDimensions
  );

  // cannot move beyond the last item
  if (isMovingForward && currentIndex === insideDroppable.length - 1) {
    return null;
  }

  // cannot move before the first item
  if (!isMovingForward && currentIndex === 0) {
    return null;
  }

  const nextIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  const nextDimension: Dimension = insideDroppable[nextIndex];

  // move 1/2 height of next dimension
  const amount: number = (draggableDimension.height / 2) + (nextDimension.height / 2);

  // Currently not supporting horizontal movement
  const diff: Position = {
    x: 0,
    y: isMovingForward ? amount : -amount,
  };

  return diff;
};

export const jumpForward = getDiff(true);
export const jumpBackward = getDiff(false);

