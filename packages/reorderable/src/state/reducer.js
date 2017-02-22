// @flow
import invariant from 'invariant';
import type { Action, State, Dimension, DragImpact, Dragging, DimensionMap, DragResult, CurrentDrag } from './types';

const initialState: State = {
  draggableDimensions: {},
  droppableDimensions: {},
  currentDrag: null,
  dragResult: null,
};

const noImpact: DragImpact = {
  movement: null,
  destination: null,
};

const getDragImpact = (currentDrag: Dragging, draggableDimensions: DimensionMap, droppableDimensions: DimensionMap): DragImpact => {
  // TODO: calculate actual movement
  // eslint-disable-next-line no-console
  console.log('returning no movement', currentDrag, draggableDimensions, droppableDimensions);
  return noImpact;
};

export default (state: State = initialState, action: Action): State => {
  console.log(`%c reducing ${action.type}`, 'color: green; font-size: 1.5em');

  if (action.type === 'LIFT') {
    const { id, type, center, offset, scroll, selection } = action.payload;

    // TODO: need source but do not have dimensions yet

    const dragging: Dragging = {
      id,
      type,
      center,
      offset,
      initial: {
        source: null,
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
        impact: noImpact,
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

  if (action.type === 'PUBLISH_DROPPABLE_DIMENSIONS') {
    const dimension: Dimension = action.payload;

    if (state.draggableDimensions[dimension.id]) {
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

    // TODO: if source is not present - set it

    // not using spread to ensure exact typing works
    const dragging = {
      id: previous.dragging.id,
      type: previous.dragging.type,
      center,
      offset,
      initial: previous.dragging.initial,
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
