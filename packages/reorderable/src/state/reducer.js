// @flow
import type {
  Dimension,
  Position,
  DraggableId,
  TypeId,
  Id,
  DraggableLocation,
} from '../types';
import type { Actions } from './action-creators';
// import {
//   LIFT,
//   MOVE,
//   PUBLISH_DRAGGABLE_DIMENSION,
//   PUBLISH_DROPPABLE_DIMENSION,
//   DROP,
//   CANCEL,
// } from './action-types';

type DimensionMap = { [key: Id]: Dimension };

type DragImpact = {|
  movement: ?{|
    draggables: DraggableId[],
    amount: number,
  |},
  destination: ?DraggableLocation
|}

type Dragging = {|
    id: DraggableId,
    type: TypeId,
    offset: Position,
    center: Position,
    initial: {|
      source: DraggableLocation,
      center: Position,
      offset: Position,
      scroll: Position,
      selection: Position,
    |}
  |}

type CurrentDrag = {|
    dragging: Dragging,
    impact: DragImpact
|}

type DragResult = {|
  draggableId: DraggableId,
  source: DraggableLocation,
  // may not have any destination (drag to nowhere)
  destination: ?DraggableLocation
|}

type StateShape = {
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
  currentDrag: ?CurrentDrag,
  dragResult: ?DragResult,
};

const initialState: StateShape = {
  draggableDimensions: {},
  droppableDimensions: {},
  currentDrag: null,
  dragResult: null,
};

const origin: Position = { x: 0, y: 0 };

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

export default (state: StateShape = initialState, action: Actions): StateShape => {
  if (action.type === 'LIFT') {
    const { id, type, center, offset, scroll, selection, source } = action.payload;

    const dragging: Dragging = {
      id,
      type,
      center,
      offset: origin,
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
        impact: noImpact,
      },
      // clearing any previous dragResult
      dragResult: null,
    };
  }

  if (action.type === 'PUBLISH_DRAGGABLE_DIMENSION') {
    const dimension: Dimension = action.payload;

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
