// @flow
import type { Position, CurrentDrag, DragImpact, Dragging, Dimension, DimensionMap, State } from '../types';
import getDraggablesInsideDroppable from './get-draggables-inside-droppable';
import getDragImpact from './get-drag-impact';

const positionMove = (isMovingFoward: boolean) => (state: State): State => {
  const previous: ?CurrentDrag = state.currentDrag;
  if (!previous) {
    console.error('cannot move when there is no current drag');
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
    console.error('cannot move when there is no destination');
    return state;
  }

  const draggableDimension: Dimension = draggableDimensions[previous.dragging.id];
  const droppableDimension: Dimension = droppableDimensions[impact.destination.droppableId];

  const insideDroppable: Dimension[] = getDraggablesInsideDroppable(droppableDimension, draggableDimensions);

  const currentIndex: number = impact.destination.index;

  if (isMovingFoward && currentIndex === insideDroppable.length - 1) {
    return state;
  }

  if (!isMovingFoward && currentIndex === 0) {
    return state;
  }

  const nextIndex = isMovingFoward ? currentIndex + 1 : currentIndex - 1;
  const nextDimension: Dimension = insideDroppable[nextIndex];

  // move down 1/2 height of next dimension
  const amount: number = (draggableDimension.height / 2) + (nextDimension.height / 2);

  const diff: Position = {
    x: 0,
    y: isMovingFoward ? amount : -amount,
  };

  const offset = {
    x: previous.dragging.offset.x + diff.x,
    y: previous.dragging.offset.y + diff.y,
  };
  const center: Position = {
    x: previous.initial.center.x + offset.x,
    y: previous.initial.center.y + offset.y,
  };

  // $ExpectError - flow does not play well with spread
  const dragging: Dragging = {
    ...previous.dragging,
    shouldAnimate: true,
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

export const moveForward = positionMove(true);
export const moveBackward = positionMove(false);
