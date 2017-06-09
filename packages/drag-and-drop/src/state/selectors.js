// @flow
import type { CurrentDrag, DragComplete, State } from '../types';

export const currentDragSelector = (state: State): ?CurrentDrag => state.currentDrag;
export const dragCompleteSelector = (state: State): ?DragComplete => state.complete;
