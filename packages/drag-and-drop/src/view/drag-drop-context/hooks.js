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

    if (onDragStart && !previous.currentDrag && state.currentDrag) {
      const dragging: Dragging = state.currentDrag.dragging;
      onDragStart(dragging.id, dragging.initial.source);
      previous = state;
      return;
    }

    const isComplete = Boolean(state.complete && !state.complete.isWaitingForAnimation);
    const wasComplete = Boolean(previous.complete && !previous.complete.isWaitingForAnimation);

    if (onDragEnd && isComplete && !wasComplete) {
      onDragEnd(state.complete.result);
    }

    previous = state;
  });

  return unsubscribe;
};
