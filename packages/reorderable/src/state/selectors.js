// @flow
import type { CurrentDrag, State } from './types';

export const currentDragSelector = (state: State): ?CurrentDrag => state.currentDrag;
