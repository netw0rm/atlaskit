// @flow
import type { DraggableId,
  DroppableId,
  DragMovement,
  DraggableDimension,
  DroppableDimension,
  DraggableDimensionMap,
  DroppableDimensionMap,
  DragImpact,
  DimensionFragment,
  Position } from '../types';
import getDroppableOver from './get-droppable-over';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';
import noImpact from './no-impact';

// It is the responsibility of this function
// to return the impact of a drag

export default (
  newCenter: Position,
  draggableId: DraggableId,
  draggableDimensions: DraggableDimensionMap,
  droppableDimensions: DroppableDimensionMap
): DragImpact => {
  const droppableId: ?DroppableId = getDroppableOver(
    newCenter, droppableDimensions
  );

  // not dragging over anything
  if (!droppableId) {
    return noImpact;
  }

  const draggingDimension: DraggableDimension = draggableDimensions[draggableId];
  const droppableDimension: DroppableDimension = droppableDimensions[droppableId];

  const insideDroppable: DraggableDimension[] = getDraggablesInsideDroppable(
    droppableDimension,
    draggableDimensions
  );

  // TEMP
  const draggableCenter: Position = draggingDimension.withoutDroppableScroll.withoutMargin.center;
  const isMovingForward: boolean = newCenter.y - draggableCenter.y > 0;

  // console.log('is moving forward?', isMovingForward);
  // console.log('is moving forward', isMovingForward, 'scrollOffset', scrollOffset);

  // TODO: if not in the same home dimensions then can only move forward

  // get all draggables inside the draggable
  // TODO: now breaking memoization because of scrollTop :()

  const moved: DraggableId[] = insideDroppable
    .filter((dimension: DraggableDimension): boolean => {
      // do not want to move the item that is dragging
      if (dimension === draggingDimension) {
        return false;
      }

      const fragment: DimensionFragment = dimension.withoutDroppableScroll.withoutMargin;

      if (isMovingForward) {
        // 1. item needs to start ahead of the moving item
        // 2. the dragging item has moved over it
        if (fragment.center.y < draggableCenter.y) {
          return false;
        }

        return newCenter.y > fragment.top;
      }
      // moving backwards
      // 1. item needs to start behind the moving item
      // 2. the dragging item has moved over it
      if (draggableCenter.y < fragment.center.y) {
        return false;
      }

      return newCenter.y < fragment.bottom;
    })
    .map((dimension: DraggableDimension): DroppableId => dimension.id);

  const startIndex = insideDroppable.indexOf(draggingDimension);
  const index: number = (() => {
    if (!moved.length) {
      return startIndex;
    }

    if (isMovingForward) {
      return startIndex + moved.length;
    }
    // is moving backwards
    return startIndex - moved.length;
  })();

  const amount = index !== startIndex ?
    draggingDimension.withoutDroppableScroll.withMargin.height :
    0;

  const movement: DragMovement = {
    amount,
    draggables: moved,
    isMovingForward,
  };

  const impact: DragImpact = {
    movement,
    destination: {
      droppableId,
      index,
    },
  };

  return impact;
};
