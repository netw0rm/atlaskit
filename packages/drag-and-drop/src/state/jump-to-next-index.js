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
  draggableId: DraggableId,
  location: DraggableLocation,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?Position => {
  const draggableDimension: Dimension = draggableDimensions[draggableId];
  const droppableDimension: Dimension = droppableDimensions[location.droppableId];
  const currentIndex: number = location.index;

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

  // Need to move into the slot that the next dimension previously took up.
  // want to move to the next dimension's center position

  const diff: Position = {
    x: nextDimension.center.x - draggableDimension.center.x,
    y: nextDimension.center.y - draggableDimension.center.y,
  };

  const directional: Position = {
    x: isMovingForward ? diff.x : -diff.x,
    y: isMovingForward ? diff.y : -diff.y,
  };

  return directional;
};

export const jumpForward = getDiff(true);
export const jumpBackward = getDiff(false);

