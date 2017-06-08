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

const getFireHooks = (hooks: Hooks) => (state: State, previous: State): void => {
  const { onDragStart, onDragEnd } = hooks;

  // Drag start
  // 1. Now dragging
  // 2. was previously not dragging
  if (onDragStart && state.currentDrag && !previous.currentDrag) {
    const { dragging, initial } = state.currentDrag;
    onDragStart(dragging.id, initial.source);
    return;
  }

  // Drag end
  const isComplete: boolean = Boolean(
    state.complete &&
    !state.complete.isWaitingForAnimation
  );
  const wasComplete: boolean = Boolean(
    previous.complete &&
    !previous.complete.isWaitingForAnimation
  );

  if (onDragEnd && isComplete && !wasComplete) {
    // will never happen - but doing it for flow
    if (!state.complete) {
      return;
    }

    onDragEnd(state.complete.result);
    return;
  }

  // Drag cancel
  // 1. not dragging
  // 2. not complete
  // 3. was previously dragging
  if (onDragEnd && !state.currentDrag && !state.complete && previous.currentDrag) {
    const result: DragResult = {
      draggableId: previous.currentDrag.dragging.id,
      source: previous.currentDrag.initial.source,
      destination: null,
    };
    onDragEnd(result);
  }
};

export default (hooks: Hooks, store: Store) => {
  let previous: ?State = null;

  const fireHooks = getFireHooks(hooks);

  const unsubscribe = store.subscribe(() => {
    const state = store.getState();

    if (previous) {
      fireHooks(state, previous);
    }

    previous = state;
  });

  return unsubscribe;
};
