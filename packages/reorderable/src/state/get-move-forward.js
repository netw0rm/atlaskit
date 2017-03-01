// @flow
import type { Position, CurrentDrag, DragImpact, Dragging, Dimension, DimensionMap, State } from '../types';
import getInsideDroppable from './get-inside-droppable';
import getDragImpact from './get-drag-impact';

export default (state: State): State => {
  const previous: ?CurrentDrag = state.currentDrag;
  if (!previous) {
    console.warn('cannot move when there is no current drag');
    return state;
  }

  const droppableDimensions: DimensionMap = state.droppableDimensions;
  const draggableDimensions: DimensionMap = state.draggableDimensions;

  // just use the previous impact if there is one
  const impact: DragImpact = previous.impact || getDragImpact(
    previous.dragging.center,
    previous.dragging.id,
    draggableDimensions,
    droppableDimensions
  );

  if (!impact.destination) {
    console.warn('cannot move when there is no destination');
    return state;
  }

  const draggableDimension: Dimension = draggableDimensions[previous.dragging.id];
  const droppableDimension: Dimension = droppableDimensions[impact.destination.droppableId];

  const insideDroppable: Dimension[] = getInsideDroppable(droppableDimension, draggableDimensions);

  const lastIndex: number = impact.destination.index;

  if (lastIndex === insideDroppable.length - 1) {
    return state;
  }

  const nextDimension: Dimension = insideDroppable[lastIndex + 1];

  // how far to move it down?
  // move down 1/2 height of next dimension
  const diff: Position = {
    x: 0,
    y: (draggableDimension.height / 2) + (nextDimension.height / 2),
  };

  const offset = {
    x: previous.dragging.offset.x + diff.x,
    y: previous.dragging.offset.y + diff.y,
  };
  const center: Position = {
    x: previous.dragging.initial.center.x + offset.x,
    y: previous.dragging.initial.center.y + offset.y,
  };

  const dragging: Dragging = {
    ...previous.dragging,
    center,
    offset,
  };
  // lazy: could just modify result directly
  const newImpact: DragImpact = getDragImpact(
    dragging.center,
    dragging.id,
    draggableDimensions,
    droppableDimensions
  );

  return {
    ...state,
    currentDrag: {
      dragging,
      impact: newImpact,
    },
  };
};
