// @flow
import type { CurrentDrag, DragComplete, DimensionMap, State } from '../types';

export const currentDragSelector = (state: State): ?CurrentDrag => state.currentDrag;
export const dragCompleteSelector = (state: State): ?DragComplete => state.complete;
export const draggableDimensionsSelector = (state: State): ?DimensionMap => state.draggableDimensions;
