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
import { moveForward, moveBackward } from './get-position-move';

const initialState: State = {
  draggableDimensions: {},
  droppableDimensions: {},
  currentDrag: null,
  complete: null,
  requestDimensions: null,
  isProcessingLift: false,
};

const noMovement = {
  draggables: [],
  amount: 0,
};

const shout = (message) => {
  console.log(`%c ${message}`, 'color: green; font-size: 1.5em');
};

const cancel = () => initialState;

export default (state: State = initialState, action: Action): State => {
  shout(`reducing ${action.type}`);

  if (action.type === 'BEGIN_LIFT') {
    return {
      ...initialState,
      isProcessingLift: true,
    };
  }

  if (action.type === 'REQUEST_DIMENSIONS') {
    if (!state.isProcessingLift) {
      return state;
    }

    const typeId: TypeId = action.payload;

    console.log('about to request dimensions');
    return {
      ...state,
      requestDimensions: typeId,
    };
  }

  if (action.type === 'COMPLETE_LIFT') {
    if (!state.isProcessingLift) {
      return state;
    }

    const { id, type, center, scroll, selection } = action.payload;

    const initialImpact: DragImpact = getDragImpact(
      center,
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
      offset: { x: 0, y: 0 },
      center,
      shouldAnimate: false,
      initial: {
        source,
        center,
        scroll,
        selection,
      },
    };

    return {
      ...state,
      isProcessingLift: false,
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

    if (!state.isProcessingLift) {
      console.info('dimension rejected as no longer requesting dimensions', dimension);
      return state;
    }

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

  if (action.type === 'MOVE_FORWARD') {
    const previous: ?CurrentDrag = state.currentDrag;
    if (previous == null) {
      return state;
    }

    return moveForward(state);
  }

  if (action.type === 'MOVE_BACKWARD') {
    const previous: ?CurrentDrag = state.currentDrag;
    if (previous == null) {
      return state;
    }

    return moveBackward(state);
  }

  if (action.type === 'DROP') {
    if (state.currentDrag == null) {
      console.log('not dropping as there is nothing dragging in the state');
      return cancel();
    }

    const { impact, dragging } = state.currentDrag;
    const last: CurrentDrag = state.currentDrag;

    // TODO: need to consider movement between two lists
    // (could impact both x and y values)
    const offset: Position = {
      x: 0,
      y: -(last.impact.movement.amount * last.impact.movement.draggables.length),
    };

    const isAnimationRequired = dragging.offset.x !== offset.x || dragging.offset.y !== offset.y;

    if (!isAnimationRequired) {
      console.log('animation is not required');
    }

    const result: DragResult = {
      draggableId: dragging.id,
      source: dragging.initial.source,
      destination: impact.destination,
    };

    const complete: DragComplete = {
      result,
      last: state.currentDrag,
      newHomeOffset: offset,
      isAnimationFinished: !isAnimationRequired,
    };

    // clear the state and add a drag result
    return {
      ...initialState,
      complete,
    };
  }

  // TODO: drop animation finished
  if (action.type === 'DROP_FINISHED') {
    if (!state.complete) {
      console.warn('not finishing drop as there is no longer a drop in the state');
      return state;
    }

    if (state.complete.isAnimationFinished) {
      return state;
    }

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
    return cancel();
  }

  return state;
};
