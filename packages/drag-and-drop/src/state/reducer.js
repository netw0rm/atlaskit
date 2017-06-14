// @flow
import memoizeOne from 'memoize-one';
import type { TypeId,
  Action,
  State,
  Dimension,
  DragImpact,
  DropResult,
  CurrentDrag,
  InitialDrag,
  PendingDrop,
  Phase,
  DraggableLocation,
  Position,
} from '../types';
import getDragImpact from './get-drag-impact';
import { getDiffToJumpForward, getDiffToJumpBackward } from './jump-to-next-index';

const shout = (message, ...rest) => {
  const key = `%c ${message}`;
  console.log(key, 'color: green; font-size: 1.5em');
  console.log('payload:', ...rest);
};

const clean = memoizeOne((phase: ?Phase): State => {
  const state: State = {
    // flow was not good with having a default arg on an optional type
    phase: phase || 'IDLE',
    drag: null,
    drop: null,
    dimension: {
      request: null,
      draggable: {},
      droppable: {},
    },
  };

  return state;
});

export default (state: State = clean('IDLE'), action: Action): State => {
  shout(`reducing ${action.type}`, action.payload ? action.payload : 'no payload');

  if (action.type === 'BEGIN_LIFT') {
    if (state.phase !== 'IDLE') {
      console.error('trying to start a lift while another is occurring');
      return state;
    }
    return clean('COLLECTING_DIMENSIONS');
  }

  if (action.type === 'REQUEST_DIMENSIONS') {
    if (state.phase !== 'COLLECTING_DIMENSIONS') {
      console.error('trying to collect dimensions at the wrong time');
      return state;
    }

    const typeId: TypeId = action.payload;

    return {
      phase: 'COLLECTING_DIMENSIONS',
      drag: null,
      drop: null,
      dimension: {
        request: typeId,
        draggable: {},
        droppable: {},
      },
    };
  }

  if (action.type === 'PUBLISH_DRAGGABLE_DIMENSION') {
    const dimension: Dimension = action.payload;

    if (state.phase !== 'COLLECTING_DIMENSIONS') {
      console.info('dimension rejected as no longer requesting dimensions', dimension);
      return state;
    }

    if (state.dimension.draggable[dimension.id]) {
      console.error(`dimension already exists for ${dimension.id}`);
      return state;
    }

    return {
      ...state,
      dimension: {
        request: state.dimension.request,
        droppable: state.dimension.droppable,
        draggable: {
          ...state.dimension.draggable,
          [dimension.id]: dimension,
        },
      },
    };
  }

  if (action.type === 'PUBLISH_DROPPABLE_DIMENSION') {
    const dimension: Dimension = action.payload;

    if (state.phase !== 'COLLECTING_DIMENSIONS') {
      console.info('dimension rejected as no longer requesting dimensions', dimension);
      return state;
    }

    if (state.dimension.droppable[dimension.id]) {
      console.error(`dimension already exists for ${dimension.id}`);
      return state;
    }

    return {
      ...state,
      dimension: {
        request: state.dimension.request,
        draggable: state.dimension.draggable,
        droppable: {
          ...state.dimension.droppable,
          [dimension.id]: dimension,
        },
      },
    };
  }

  if (action.type === 'COMPLETE_LIFT') {
    if (state.phase !== 'COLLECTING_DIMENSIONS') {
      console.error('trying complete lift without collecting dimensions');
      return state;
    }

    const { id, type, center, scroll, selection } = action.payload;

    const impact: DragImpact = getDragImpact(
      center,
      id,
      state.dimension.draggable,
      state.dimension.droppable,
    );

    const source: ?DraggableLocation = impact.destination;

    if (!source) {
      console.error('lifting a draggable that is not inside a droppable');
      return clean();
    }

    const initial: InitialDrag = {
      source,
      center,
      scroll,
      selection,
      dimension: state.dimension.draggable[id],
    };

    const current: CurrentDrag = {
      id,
      type,
      offset: { x: 0, y: 0 },
      center,
      shouldAnimate: false,
    };

    return {
      ...state,
      phase: 'DRAGGING',
      drag: {
        initial,
        current,
        impact,
      },
    };
  }

  if (action.type === 'MOVE') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot move while not dragging', action);
      return state;
    }

    if (!state.drag) {
      console.error('cannot move if there is no drag information');
      return clean();
    }

    const { offset, center } = action.payload;
    const previous = state.drag.current;

    const current: CurrentDrag = {
      id: previous.id,
      type: previous.type,
      shouldAnimate: previous.shouldAnimate,
      center,
      offset,
    };

    const impact: DragImpact = getDragImpact(
      current.center,
      current.id,
      state.dimension.draggable,
      state.dimension.droppable,
    );

    return {
      ...state,
      drag: {
        initial: state.drag.initial,
        impact,
        current,
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

    if (!previous.impact.destination) {
      console.warn('cannot move forward when there is not previous location');
      return state;
    }

    const diff: ?Position = getDiffToJumpBackward(
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

  if (action.type === 'DROP_ANIMATE') {
    const { newHomeOffset, result } = action.payload;

    if (state.phase !== 'DRAGGING') {
      console.error('cannot animate drop while not dragging', action);
      return state;
    }

    if (!state.drag) {
      console.error('cannot animate drop - invalid drag state');
      return clean();
    }

    const pending: PendingDrop = {
      newHomeOffset,
      result,
      last: state.drag,
    };

    return {
      phase: 'DROP_ANIMATING',
      drag: null,
      drop: {
        pending,
        result: null,
      },
      dimension: state.dimension,
    };
  }

  if (action.type === 'DROP_COMPLETE') {
    const result: DropResult = action.payload;

    return {
      phase: 'DROP_COMPLETE',
      drag: null,
      drop: {
        pending: null,
        result,
      },
      dimension: {
        request: null,
        draggable: {},
        droppable: {},
      },
    };
  }

  if (action.type === 'CANCEL') {
    return clean();
  }

  return state;
};
