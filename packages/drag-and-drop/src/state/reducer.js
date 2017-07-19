// @flow
import memoizeOne from 'memoize-one';
import type { TypeId,
  Action,
  State,
  DraggableDimension,
  DroppableDimension,
  DimensionState,
  DragImpact,
  DragState,
  DropResult,
  CurrentDrag,
  CurrentDragComponent,
  InitialDrag,
  InitialDragComponent,
  PendingDrop,
  Phase,
  DraggableLocation,
  Position,
} from '../types';
import { add, subtract, negate } from './position';
import getDragImpact from './get-drag-impact';
import getDiffToJumpToNextIndex from './get-diff-to-jump-to-next-index';

const noDimensions: DimensionState = {
  request: null,
  draggable: {},
  droppable: {},
};

const clean = memoizeOne((phase: ?Phase): State => {
  const state: State = {
    // flow was not good with having a default arg on an optional type
    phase: phase || 'IDLE',
    drag: null,
    drop: null,
    dimension: noDimensions,
  };

  return state;
});

export default (state: State = clean('IDLE'), action: Action): State => {
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
    const dimension: DraggableDimension = action.payload;

    if (state.phase !== 'COLLECTING_DIMENSIONS') {
      console.warn('dimension rejected as no longer requesting dimensions', dimension);
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
    const dimension: DroppableDimension = action.payload;

    if (state.phase !== 'COLLECTING_DIMENSIONS') {
      console.warn('dimension rejected as no longer requesting dimensions', dimension);
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

    const { id, type, center, page } = action.payload;
    const draggable: DraggableDimension = state.dimension.draggable[id];
    const droppable: DroppableDimension = state.dimension.droppable[draggable.droppableId];

    const initialWithoutScroll: InitialDragComponent = {
      page,
      center,
    };

    const initialWithScroll: InitialDragComponent = {
      page: add(page, droppable.scroll.initial),
      center: add(center, droppable.scroll.initial),
    };

    const impact: DragImpact = getDragImpact(
      initialWithoutScroll.page,
      initialWithoutScroll.page,
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
      withoutDroppableScroll: initialWithoutScroll,
      withDroppableScroll: initialWithScroll,
      dimension: draggable,
    };

    const currentWithoutScroll: CurrentDragComponent = {
      offset: { x: 0, y: 0 },
      center,
    };
    const currentWithScroll: CurrentDragComponent = {
      offset: negate(droppable.scroll.initial),
      center: add(center, negate(droppable.scroll.initial)),
    };

    const current: CurrentDrag = {
      id,
      type,
      withoutDroppableScroll: currentWithoutScroll,
      withDroppableScroll: currentWithScroll,
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

  if (action.type === 'UPDATE_DROPPABLE_DIMENSION_SCROLL') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot update a droppable dimensions scroll when not dragging');
      return clean();
    }

    const { id, offset } = action.payload;

    const target: ?DroppableDimension = state.dimension.droppable[id];

    if (!target) {
      console.error('cannot update a droppable that is not inside of the state', id);
      return clean();
    }
    // $ExpectError - flow does not like spread
    const dimension: DroppableDimension = {
      ...target,
      scroll: {
        initial: target.scroll.initial,
        current: offset,
      },
    };

    console.log('updating scroll of dimension to', offset);

    return {
      ...state,
      dimension: {
        request: state.dimension.request,
        draggable: state.dimension.draggable,
        droppable: {
          ...state.dimension.droppable,
          [id]: dimension,
        },
      },
    };
  }

  if (action.type === 'MOVE') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot move while not dragging', action);
      return clean();
    }

    if (state.drag == null) {
      console.error('cannot move if there is no drag information');
      return clean();
    }

    const { page } = action.payload;

    const previous: CurrentDrag = state.drag.current;
    const initial: InitialDrag = state.drag.initial;
    const droppable: DroppableDimension = state.dimension.droppable[initial.source.droppableId];

    const offset: Position = subtract(page, initial.withoutDroppableScroll.page);
    const center: Position = add(offset, initial.withoutDroppableScroll.center);

    const withoutDroppableScroll: CurrentDragComponent = {
      offset,
      center,
    };

    const scrollDiff: Position = subtract(droppable.scroll.initial, droppable.scroll.current);
    const scroll: Position = add(negate(droppable.scroll.current), negate(scrollDiff));

    const withDroppableScroll: CurrentDragComponent = {
      offset: add(offset, scroll),
      center: add(center, scroll),
    };

    const current: CurrentDrag = {
      id: previous.id,
      type: previous.type,
      withoutDroppableScroll,
      withDroppableScroll,
      // not animating small movements
      shouldAnimate: false,
    };

    const point: Position = add(withoutDroppableScroll.center, negate(scrollDiff));

    const impact: DragImpact = getDragImpact(
      page,
      point,
      current.id,
      state.dimension.draggable,
      state.dimension.droppable,
    );

    const drag: DragState = {
      initial, impact, current,
    };

    return {
      ...state,
      drag,
    };
  }

  if (action.type === 'MOVE_FORWARD' || action.type === 'MOVE_BACKWARD') {
    if (state.phase !== 'DRAGGING') {
      console.error('cannot move while not dragging', action);
      return clean();
    }

    if (!state.drag) {
      console.error('cannot move if there is no drag information');
      return clean();
    }

    const existing: DragState = state.drag;

    if (!existing.impact.destination) {
      console.warn('cannot move forward when there is not previous location');
      return state;
    }

    const isMovingForward: boolean = action.type === 'MOVE_FORWARD';

    const diff: ?Position = getDiffToJumpToNextIndex(
      isMovingForward,
      existing.current.id,
      existing.impact.destination,
      state.dimension.draggable,
      state.dimension.droppable,
    );

    // cannot move anyway (at the beginning or end of a list)
    if (!diff) {
      return state;
    }

    const offset: Position = {
      x: existing.current.offset.x + diff.x,
      y: existing.current.offset.y + diff.y,
    };

    const center: Position = {
      x: existing.current.center.x + diff.x,
      y: existing.current.center.y + diff.y,
    };

    const current: CurrentDrag = {
      id: existing.current.id,
      type: existing.current.type,
      offset,
      center,
      // animating movement
      shouldAnimate: true,
    };

    const impact: DragImpact = getDragImpact(
      current.center,
      current.id,
      state.dimension.draggable,
      state.dimension.droppable
    );

    return {
      ...state,
      drag: {
        initial: existing.initial,
        current,
        impact,
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
      dimension: noDimensions,
    };
  }

  if (action.type === 'CANCEL') {
    return clean();
  }

  return state;
};
