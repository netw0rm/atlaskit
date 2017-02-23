// @flow
import getDroppableOver from './get-droppable-over';
import type { Action, State, Dimension, DragImpact, Dragging, DimensionMap, DragResult, CurrentDrag } from './types';
import getDragImpact from './get-drag-impact';

const initialState: State = {
  draggableDimensions: {},
  droppableDimensions: {},
  currentDrag: null,
  dragResult: null,
  requestDimensions: null,
};

const noMovement = {
  draggables: [],
  amount: 0,
};

const shout = (message) => {
  console.log(`%c ${message}`, 'color: green; font-size: 1.5em');
};

export default (state: State = initialState, action: Action): State => {
  shout(`reducing ${action.type}`);

  if (action.type === 'REQUEST_DIMENSIONS') {
    const typeId: TypeId = action.payload;

    console.log('about to request dimensions');
    return {
      ...state,
      requestDimensions: typeId,
    };
  }

  if (action.type === 'LIFT') {
    const { id, type, center, offset, scroll, selection } = action.payload;

    // TODO: need source but do not have dimensions yet
    // source: need to take into account offset
    // current impact: do not need to take into account offset
    // current center: do not need to consider offset

    const originCenter: Position = {
      x: center.x - offset.x,
      y: center.y - offset.y,
    };

    const droppableId: ?DroppableId = getDroppableOver(originCenter, state.draggableDimensions, state.droppableDimensions);

    if (!droppableId) {
      console.error('lifting a draggable that is not inside a droppable');
      return state;
    }

    const source: DragLocation = {
      droppableId,
      // TODO: correct order
      order: 0,
    };

    const dragging: Dragging = {
      id,
      type,
      center,
      offset,
      initial: {
        source,
        center,
        offset,
        scroll,
        selection,
      },
    };

    return {
      ...state,
      currentDrag: {
        dragging,
        impact: {
          movement: noMovement,
          destination: source,
        },
      },
      // clearing any previous dragResult
      dragResult: null,
    };
  }

  if (action.type === 'PUBLISH_DRAGGABLE_DIMENSION') {
    const dimension: Dimension = action.payload;

    if (state.draggableDimensions[dimension.id]) {
      console.error(`dimension already exists for ${dimension.id}`);
      return state;
    }

    return {
      ...state,
      draggableDimensions: {
        ...state.draggableDimensions,
        [dimension.id]: dimension,
      },
    };
  }

  if (action.type === 'PUBLISH_DROPPABLE_DIMENSION') {
    const dimension: Dimension = action.payload;

    if (state.droppableDimensions[dimension.id]) {
      console.error(`dimension already exists for ${dimension.id}`);
      return state;
    }

    return {
      ...state,
      droppableDimensions: {
        ...state.droppableDimensions,
        [dimension.id]: dimension,
      },
    };
  }

  if (action.type === 'MOVE') {
    const { offset, center } = action.payload;
    const previous: ?CurrentDrag = state.currentDrag;
    if (previous == null) {
      return state;
    }

    const dragging = {
      ...previous.dragging,
      center,
      offset,
    };

    const impact: DragImpact = getDragImpact(dragging, state.draggableDimensions, state.droppableDimensions);

    return {
      ...state,
      currentDrag: {
        dragging,
        impact,
      },
    };
  }

  if (action.type === 'DROP') {
    if (state.currentDrag == null) {
      return state;
    }

    const { impact, dragging } = state.currentDrag;

    const dragResult: DragResult = {
      draggableId: dragging.id,
      source: dragging.initial.source,
      destination: impact.destination,
    };

    // clear the state and add a drag result
    return {
      ...initialState,
      dragResult,
    };
  }

  if (action.type === 'CANCEL') {
    return initialState;
  }

  return state;
};
