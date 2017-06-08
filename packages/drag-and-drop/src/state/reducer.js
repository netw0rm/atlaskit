// @flow
import type { TypeId,
  Action,
  State,
  Dimension,
  DragImpact,
  Dragging,
  DraggingInitial,
  DragResult,
  CurrentDrag,
  DraggableLocation,
  Position,
  DragComplete,
} from '../types';
import getDragImpact from './get-drag-impact';
import { moveBackward } from './get-position-move';
import { getDiffToJumpForward } from './jump-to-next-index';

const shout = (message, ...rest) => {
  const key = `%c ${message}`;
  console.log(key, 'color: green; font-size: 1.5em');
  console.log('payload:', ...rest);
};

const reset = (() => {
  const initialState: State = {
    draggableDimensions: {},
    droppableDimensions: {},
    currentDrag: null,
    complete: null,
    requestDimensions: null,
    isProcessingLift: false,
  };

  return (): State => initialState;
})();

export default (state: State = reset(), action: Action): State => {
  shout(`reducing ${action.type}`, action.payload ? action.payload : 'no payload');

  if (action.type === 'BEGIN_LIFT') {
    if (state.isProcessingLift) {
      console.warn('trying to start another lift while processing the first');
      return state;
    }

    return {
      ...reset(),
      isProcessingLift: true,
    };
  }

  if (action.type === 'REQUEST_DIMENSIONS') {
    if (!state.isProcessingLift) {
      return state;
    }

    const typeId: TypeId = action.payload;

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

    const impact: DragImpact = getDragImpact(
      center,
      id,
      state.draggableDimensions,
      state.droppableDimensions,
    );

    const source: ?DraggableLocation = impact.destination;

    if (!source) {
      console.error('lifting a draggable that is not inside a droppable');
      return reset();
    }

    const initial: DraggingInitial = {
      source,
      center,
      scroll,
      selection,
      dimension: state.draggableDimensions[id],
    };

    const dragging: Dragging = {
      id,
      type,
      offset: { x: 0, y: 0 },
      center,
      shouldAnimate: false,
    };

    return {
      ...state,
      isProcessingLift: false,
      currentDrag: {
        dragging,
        impact,
        initial,
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
        initial: previous.initial,
      },
    };
  }

  if (action.type === 'MOVE_FORWARD') {
    const previous: ?CurrentDrag = state.currentDrag;
    if (previous == null) {
      return state;
    }

    if (!previous.impact.destination) {
      console.warn('cannot move forward when there is not previous location');
      return state;
    }

    const diff: ?Position = getDiffToJumpForward(
      previous.dragging.center,
      previous.impact.destination,
      state.draggableDimensions,
      state.droppableDimensions
    );

    if (!diff) {
      return state;
    }

    const offset: Position = {
      x: previous.dragging.offset.x + diff.x,
      y: previous.dragging.offset.y + diff.y,
    };

    const center: Position = {
      x: previous.dragging.center.x + diff.x,
      y: previous.dragging.center.y + diff.y,
    };

    // $ExpectError - flow does not play well with spread
    const dragging: Dragging = {
      ...previous.dragging,
      shouldAnimate: true,
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
        initial: previous.initial,
      },
    };
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
      console.error('not dropping as there is nothing dragging in the state');
      return reset();
    }

    const { impact, dragging, initial } = state.currentDrag;
    const last: ?CurrentDrag = state.currentDrag;

    if (!last) {
      console.error('finishing drag without having started a drag');
      return reset();
    }

    // TODO: need to consider movement between two lists
    // (could impact both x and y values)
    const amount = last.impact.movement.isMovingForward ?
      last.impact.movement.amount : -last.impact.movement.amount;

    const offset: Position = {
      x: 0,
      y: (amount * last.impact.movement.draggables.length),
    };

    const isAnimationRequired = dragging.offset.x !== offset.x || dragging.offset.y !== offset.y;

    if (!isAnimationRequired) {
      console.log('animation is not required');
    }

    const destination: ?DraggableLocation = (() => {
      // dropping outside of a list
      if (!impact.destination) {
        return null;
      }

      // if nothing has moved - return null as the destination
      const hasNotMoved =
        impact.destination.droppableId === initial.source.droppableId &&
        impact.destination.index === initial.source.index;

      return hasNotMoved ? null : impact.destination;
    })();

    const result: DragResult = {
      draggableId: dragging.id,
      source: initial.source,
      destination,
    };

    const complete: DragComplete = {
      result,
      last,
      newHomeOffset: offset,
      isWaitingForAnimation: isAnimationRequired,
    };

    // clear the state and add a drag result
    return {
      ...reset(),
      complete,
    };
  }

  // TODO: drop animation finished
  if (action.type === 'DROP_ANIMATION_FINISHED') {
    if (!state.complete) {
      console.warn('not finishing drop as there is no longer a drop in the state');
      return state;
    }

    if (!state.complete.isWaitingForAnimation) {
      console.warn('not finishing drop as there is it is not waiting for an animation to finish');
      return state;
    }

    const complete: DragComplete = {
      result: state.complete.result,
      last: state.complete.last,
      newHomeOffset: state.complete.newHomeOffset,
      isWaitingForAnimation: false,
    };

    return {
      ...state,
      complete,
    };
  }

  if (action.type === 'CANCEL') {
    return reset();
  }

  return state;
};
