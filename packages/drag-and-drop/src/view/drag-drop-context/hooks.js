// @flow
import type {
  Dragging,
  DraggableId,
  DraggableLocation,
  DragResult,
  Store,
  State,
} from '../../types';

export type Hooks = {
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd?: (result: DragResult) => void,
}

export default (hooks: Hooks, store: Store) => {
  const { onDragStart, onDragEnd } = hooks;
  let previous: ?State = null;

  const unsubscribe = store.subscribe(() => {
    const state = store.getState();

    if (!previous) {
      previous = state;
      return;
    }

    // drag start
    if (onDragStart && !previous.currentDrag && state.currentDrag) {
      const dragging: Dragging = state.currentDrag.dragging;
      onDragStart(dragging.id, dragging.initial.source);
      previous = state;
      return;
    }

    // drag end
    const isComplete = Boolean(state.complete && !state.complete.isWaitingForAnimation);
    const wasComplete = Boolean(previous.complete && !previous.complete.isWaitingForAnimation);

    if (onDragEnd && isComplete && !wasComplete) {
      onDragEnd(state.complete.result);
      previous = state;
      return;
    }

    // drag cancel
    const isDragging = Boolean(state.currentDrag);
    const wasDragging = Boolean(previous.currentDrag);

    if (!isDragging && wasDragging) {
      if (!previous.currentDrag) {
        return;
      }
      const result: DragResult = {
        draggableId: previous.currentDrag.dragging.id,
        source: previous.currentDrag.dragging.initial.source,
        destination: null,
      };
      onDragEnd(result);
      previous = state;
      return;
    }

    previous = state;
  });

  return unsubscribe;
};
