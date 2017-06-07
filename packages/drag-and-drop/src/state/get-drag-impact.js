// @flow
import memoizeOne from 'memoize-one';
import type { DraggableId,
  DroppableId,
  DragMovement,
  Dimension,
  DimensionMap,
  DragImpact,
  Position } from '../types';
import getDroppableOver from './get-droppable-over';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';

const noMovement: DragMovement = {
  draggables: [],
  amount: 0,
  isMovingForward: false,
};

const noImpact: DragImpact = {
  movement: noMovement,
  destination: null,
};

// It is the responsiblity of this function to return
// the impact of a drag

export default (
  newCenter: Position,
  draggableId: DraggableId,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap
): DragImpact => {
  const droppableId: ?DroppableId = getDroppableOver(
    newCenter, droppableDimensions
  );

  // not dragging over anything
  if (!droppableId) {
    return noImpact;
  }

  const draggingDimension: Dimension = draggableDimensions[draggableId];
  const droppableDimension: Dimension = droppableDimensions[droppableId];

  const isMovingForward: boolean = newCenter.y - draggingDimension.center.y > 0;

  // get all draggables inside the draggable
  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(droppableDimension, draggableDimensions);

  const moved: DraggableId[] = insideDroppable
    .filter((dimension: Dimension): boolean => {
      // do not want to move the item that is dragging
      if (dimension === draggingDimension) {
        return false;
      }

      if (isMovingForward) {
        // 1. item needs to start ahead of the moving item
        // 2. the dragging item has moved over it
        if (dimension.center.y < draggingDimension.center.y) {
          return false;
        }

        return newCenter.y > dimension.top;
      }
      // moving backwards
      // 1. item needs to start behind the moving item
      // 2. the dragging item has moved over it
      if (draggingDimension.center.y < dimension.center.y) {
        return false;
      }

      return newCenter.y < dimension.bottom;
    })
    .map((dimension: Dimension): DroppableId => dimension.id);

  // nothing has needed to move out of the way
  if (!moved.length) {
    return noImpact;
  }

  const startIndex = insideDroppable.indexOf(draggingDimension);
  const index: number = (() => {
    if (isMovingForward) {
      return startIndex + moved.length;
    }
    // is moving backwards
    return startIndex - moved.length;
  })();

  const amount = draggingDimension.height;
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
