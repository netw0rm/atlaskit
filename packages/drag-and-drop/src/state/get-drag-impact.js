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
import getInsideDroppable from './get-inside-droppable';

const noMovement: DragMovement = {
  draggables: [],
  amount: 0,
};

type Direction = 1 | -1;

export default (target: Position,
  draggableId: DraggableId,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap): DragImpact => {
  const droppableId: ?DroppableId = getDroppableOver(
    target, droppableDimensions
  );

  // to cut scope: assume in same list
  if (!droppableId) {
    return {
      movement: noMovement,
      destination: null,
    };
  }

  const draggingDimension: Dimension = draggableDimensions[draggableId];
  const droppableDimension: Dimension = droppableDimensions[droppableId];

  // positive = moving forwards (TODO! currently this is backwards)
  // negative = moving backwards
  const direction: Direction = target.y - draggingDimension.center.y > 0 ? 1 : -1;
  const isMovingForward: boolean = target.y - draggingDimension.center.y > 0;

    // get all draggables inside the draggable
  const insideDroppable: Dimension[] = getInsideDroppable(droppableDimension, draggableDimensions);

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

        return target.y > dimension.top;
      }
      // moving backwards
      // 1. item needs to start behind the moving item
      // 2. the dragging item has moved over it
      if (draggingDimension.center.y < dimension.center.y) {
        return false;
      }

      return target.y < dimension.bottom;
    })
    .map((dimension: Dimension): DroppableId => dimension.id);

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

  console.log('current index', index);

  const amount = draggingDimension.height * -1 * direction;
  const movement: DragMovement = {
    amount,
    draggables: moved,
  };

  return {
    movement,
    destination: {
      droppableId,
      index,
    },
  };
};
