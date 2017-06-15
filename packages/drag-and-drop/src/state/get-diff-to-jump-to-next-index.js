// @flow
import type {
  DraggableLocation,
  Dimension,
  DimensionMap,
  Position,
} from '../types';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';

export default (
  isMovingForward: boolean,
  center: Position,
  location: DraggableLocation,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?Position => {
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
    x: nextDimension.center.x - center.x,
    y: nextDimension.center.y - center.y,
  };

  return diff;
};

