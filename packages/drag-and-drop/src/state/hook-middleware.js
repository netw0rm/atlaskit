// @flow
import memoizeOne from 'memoize-one';
import type { Action, Store, State, Hooks, DropResult } from '../types';

const getFireHooks = (hooks: Hooks) => memoizeOne((state: State, previous: State): void => {
  const { onDragStart, onDragEnd } = hooks;

  const currentPhase = state.phase;
  const previousPhase = previous.phase;

  // Drag start
  if (currentPhase === 'DRAGGING' && previousPhase !== 'DRAGGING' && onDragStart) {
    if (!state.drag) {
      console.error('cannot fire onDragStart hook without drag state', { state, previous });
      return;
    }
    onDragStart(state.drag.current.id, state.drag.initial.source);
    return;
  }

  // Drag end
  if (currentPhase === 'DROP_COMPLETE' && previousPhase !== 'DROP_COMPLETE' && onDragEnd) {
    if (!state.drop || !state.drop.result) {
      console.error('cannot fire onDragEnd hook without drag state', { state, previous });
      return;
    }

    const { source, destination, draggableId } = state.drop.result;

    if (!destination) {
      onDragEnd(state.drop.result);
      return;
    }

    // Do not publish a result where nothing moved
    const didMove: boolean = source.droppableId !== destination.droppableId ||
                              source.index !== destination.index;

    if (didMove) {
      onDragEnd(state.drop.result);
      return;
    }

    const muted: DropResult = {
      draggableId,
      source,
      destination: null,
    };

    onDragEnd(muted);
  }

  // Drag cancelled
  if (currentPhase === 'IDLE' &&
    (previousPhase === 'DRAGGING' || previousPhase === 'DROP_ANIMATING') &&
    onDragEnd) {
    if (!previous.drag) {
      console.error('cannot fire onDragEnd for cancel because cannot find previous drag');
      return;
    }

    const result: DropResult = {
      draggableId: previous.drag.current.id,
      source: previous.drag.initial.source,
      destination: null,
    };
    onDragEnd(result);
  }
});

export default (hooks: Hooks) => {
  const fireHooks = getFireHooks(hooks);
  return (store: Store) => (next: (Action) => mixed) => (action: Action): mixed => {
    const previous: State = store.getState();

    const result: mixed = next(action);

    const current: State = store.getState();

    fireHooks(current, previous);

    return result;
  };
};
