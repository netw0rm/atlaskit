// @flow
import { createSelector } from 'reselect';
import type { CurrentDrag, DragMovement } from './types';

export const currentDragSelector: ?CurrentDrag = state => state.currentDrag;
