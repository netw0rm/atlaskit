// @flow
import type { TypeId,
  Action,
  State,
  Dimension,
  DragImpact,
  Dragging,
  DragResult,
  CurrentDrag,
  DraggableLocation,
  Position,
  DragComplete,
} from '../types';
import getDragImpact from './get-drag-impact';

const initialState: State = {
  draggableDimensions: {},
  droppableDimensions: {},
  currentDrag: null,
  complete: null,
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

  if (action.type === 'BEGIN_LIFT') {
    // clear out any current state including result
    return initialState;
  }

  if (action.type === 'REQUEST_DIMENSIONS') {
    const typeId: TypeId = action.payload;

    console.log('about to request dimensions');
    return {
      ...state,
      requestDimensions: typeId,
    };
  }

  if (action.type === 'COMPLETE_LIFT') {
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
    const last: CurrentDrag = state.currentDrag;

    // TODO: need to consider movement between two lists
    // (could impact both x and y values)
    const offset: Position = {
      x: 0,
      y: -(last.impact.movement.amount * last.impact.movement.draggables.length),
    };

    const result: DragResult = {
      draggableId: dragging.id,
      source: dragging.initial.source,
      destination: impact.destination,
    };

    const complete: DragComplete = {
      result,
      last: state.currentDrag,
      newHomeOffset: offset,
      isAnimationFinished: false,
    };

    // clear the state and add a drag result
    return {
      ...initialState,
      complete,
    };
  }

  if (action.type === 'DROP_FINISHED') {
    if (!state.complete) {
      console.warn('not finishing drop as there is no longer a drop in the state');
      return state;
    }
    // not using spread so that flow exact type works

    const complete: DragComplete = {
      result: state.complete.result,
      last: state.complete.last,
      newHomeOffset: state.complete.newHomeOffset,
      isAnimationFinished: true,
    };

    return {
      ...state,
      complete,
    };
  }

  if (action.type === 'CANCEL') {
    return initialState;
  }

  return state;
};
