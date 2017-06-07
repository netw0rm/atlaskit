// @flow
import getDroppableOver from './get-droppable-over';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';

import type {
  DraggableLocation,
  Dimension,
  DimensionMap,
  DroppableId,
  DraggableId,
  Position,
} from '../types';

export default (
  target: Position,
  draggableId: DraggableId,
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
): ?DraggableLocation => {
  const droppableId: ?DroppableId = getDroppableOver(
    target, droppableDimensions
  );

  if (!droppableId) {
    return null;
  }

  const draggingDimension: Dimension = draggableDimensions[draggableId];
  const droppableDimension: Dimension = droppableDimensions[droppableId];

  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(droppableDimension, draggableDimensions);
  const index: number = insideDroppable.indexOf(draggingDimension);

  const location: DraggableLocation = {
    droppableId,
    index,
  };

  return location;
};
