// @flow
import { createSelector } from 'reselect';
import type { CurrentDrag } from './types';

export const currentDragSelector: ?CurrentDrag = state => state.currentDrag;

