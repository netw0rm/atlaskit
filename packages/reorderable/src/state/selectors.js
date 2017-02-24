// @flow
import type { CurrentDrag, State } from './types';

export const currentDragSelector: ?CurrentDrag = (state: State) => state.currentDrag;
