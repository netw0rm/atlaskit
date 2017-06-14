// @flow
import type {
  PendingDrop,
  DragState,
  Phases,
  State,
} from '../types';

export const phaseSelector = (state: State): Phases => state.phase;

export const pendingDropSelector = (state: State): ?PendingDrop => {
  if (!state.drop || !state.drop.pending) {
    return null;
  }
  return state.drop.pending;
};

export const dragSelector = (state: State): ?DragState => state.drag;
