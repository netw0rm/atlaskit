// @flow
import type { TypeId } from '../types';
import type { Action, State, Dimension, DragImpact, Dragging, DragResult, CurrentDrag, DraggableLocation, Position } from './types';
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

    const originCenter: Position = {
      x: center.x - offset.x,
      y: center.y - offset.y,
    };

    const initialImpact: DragImpact = getDragImpact(
      originCenter,
      id,
      state.draggableDimensions,
      state.droppableDimensions
    );

    const source: ?DraggableLocation = initialImpact.destination;

    if (!source) {
      console.error('lifting a draggable that is not inside a droppable');
      return state;
    }

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

    const impact: DragImpact = getDragImpact(
      dragging.center,
      dragging.id,
      state.draggableDimensions,
      state.droppableDimensions
    );

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
