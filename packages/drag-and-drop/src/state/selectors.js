// @flow
import type {
  CurrentDrag,
  DragImpact,
  InitialDrag,
  PendingDrop,
  Phases,
  State,
} from '../types';

export const phaseSelector = (state: State): Phases => state.phase;

export const currentDragSelector = (state: State): ?CurrentDrag => {
  if (!state.drag) {
    return null;
  }
  return state.drag.current;
};

export const initialDragSelector = (state: State): ?InitialDrag => {
  if (!state.drag) {
    return null;
  }
  return state.drag.initial;
};

export const dragImpactSelector = (state: State): ?DragImpact => {
  if (!state.drag) {
    return null;
  }
  return state.drag.impact;
};

export const pendingDropSelector = (state: State): ?PendingDrop => {
  if (!state.drop || !state.drop.pending) {
    return null;
  }
  return state.drop.pending;
};
