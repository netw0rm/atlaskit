// @flow
import memoizeOne from 'memoize-one';
import type { DragMovement, Dragging, DimensionMap } from './types';
import getDroppableOver from './get-droppable-over';
import isInsideDimension from './is-inside-dimension';

const noMovement: DragMovement = {
  draggables: [],
  amount: 0,
};

type Direction = 1 | -1;

const getDimensionList: Dimension[] = memoizeOne(
  (map: DimensionMap): Dimension[] => Object.keys(map).map(key => map[key])
);

const getDimensionsInDroppable: Dimension[] = memoizeOne((droppableId: DroppableId,
  draggableDimensions: DimensionMap,
  droppableDimension: Dimension) => {
  const draggableDimensionList: Dimension[] = getDimensionList(draggableDimensions);

  return draggableDimensionList.filter((dimension: Dimension): boolean => {

  });
});

export default (currentDrag: Dragging,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap): DragImpact => {
  const droppableId: ?DroppableId = getDroppableOver(
    currentDrag.center, draggableDimensions, droppableDimensions
  );

  // to cut scope: assume in same list
  if (!droppableId) {
    return {
      movement: noMovement,
      destination: null,
    };
  }

  const draggingDimension: Dimension = draggableDimensions[currentDrag.id];
  const droppableDimension: Dimension = droppableDimensions[droppableId];

  // positive = moving forwards
  // negative = moving backwards
  const direction: Direction = currentDrag.center.y - draggingDimension.center.y > 0 ? 1 : -1;
  const isMovingForward: boolean = currentDrag.center.y - draggingDimension.center.y > 0;

  const moved: draggables[] = Object.keys(draggableDimensions)
    .map((key: DraggableId): Dimension => draggableDimensions[key])
    // get all draggables inside the draggable
    .filter((dimension: Dimension): boolean => {
      if (dimension === draggingDimension) {
        return false;
      }

      return isInsideDimension(dimension.center, droppableDimension);
    })
    .filter((dimension: Dimension): boolean => {
      if (isMovingForward) {
        // 1. item needs to start ahead of the moving item
        // 2. the dragging item has moved over it
        if (dimension.center.y < draggingDimension.center.y) {
          return false;
        }

        return currentDrag.center.y > dimension.center.y;
      }
      // moving backwards
      // 1. item needs to start behind the moving item
      // 2. the dragging item has moved over it
      if (draggingDimension.center.y < dimension.center.y) {
        return false;
      }

      return currentDrag.center.y < dimension.center.y;
    })
    .map((dimension: Dimension): DroppableId => dimension.id);

  const amount = draggingDimension.height * -1 * direction;
  const movement: DragMovement = {
    amount,
    draggables: moved,
  };

  return {
    movement,
    destination: {
      droppableId,
      order: null,
    },
  };
};
