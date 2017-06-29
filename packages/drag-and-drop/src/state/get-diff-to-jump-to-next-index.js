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

  // Need to move into the slot that the next dimension previously took up.
  // want to move to the next dimension's center position

  // const diff: Position = {
  //   x: nextDimension.center.x - center.x,
  //   y: nextDimension.center.y - center.y,
  // };
  // if (nextIndex === startIndex) {
  //   return origin;
  // }
  const isBeyondStartIndex = nextIndex >= startIndex;

  if (isBeyondStartIndex) {
    const diff: Position = {
      x: 0,
      y: isMovingForward ?
          currentDimension.withMargin.height :
          -nextDimension.withMargin.height,
    };
    return diff;
  }

  const diff: Position = {
    x: 0,
    y: isMovingForward ?
        nextDimension.withMargin.height :
        -currentDimension.withMargin.height,
  };
  return diff;

  const move: Position = {
    x: 0,
    y: isMovingForward ?
      currentDimension.withMargin.height :
      -nextDimension.withMargin.height,
  };

  return move;

  console.log('is moving past start', nextIndex > startIndex);

  if (nextIndex > startIndex) {
    const move: Position = {
      x: 0,
      y: isMovingForward ?
        nextDimension.withMargin.height :
        -currentDimension.withMargin.height,
    };

    return move;
  }

  return origin;
};

