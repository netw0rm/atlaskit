// @flow
import type {
  DraggableLocation,
  Dimension,
  DimensionMap,
  Position,
  DraggableId,
} from '../types';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';

const origin: Position = { x: 0, y: 0 };

export default (
  isMovingForward: boolean,
  draggableId: DraggableId,
  center: Position,
  location: DraggableLocation,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?Position => {
  const droppableDimension: Dimension = droppableDimensions[location.droppableId];
  const draggableDimension: Dimension = draggableDimensions[draggableId];
  const currentIndex: number = location.index;

  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(
    droppableDimension,
    draggableDimensions
  );

  // TODO: memoize
  const startIndex: number = insideDroppable.indexOf(draggableDimension);

  // cannot move beyond the last item
  if (isMovingForward && currentIndex === insideDroppable.length - 1) {
    return null;
  }

  // cannot move before the first item
  if (!isMovingForward && currentIndex === 0) {
    return null;
  }

  const currentDimension: Dimension = insideDroppable[currentIndex];
  const nextIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  const nextDimension: Dimension = insideDroppable[nextIndex];

  const isMovingTowardStart = (isMovingForward && nextIndex <= startIndex) ||
    (!isMovingForward && nextIndex >= startIndex);

  const amount: number = isMovingTowardStart ?
    currentDimension.withMargin.height :
    nextDimension.withMargin.height;

  const diff: Position = {
    // not worrying about horizontal for now
    x: 0,
    y: isMovingForward ? amount : -amount,
  };

  return diff;
};

