// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Id, DraggableId, DroppableId, TypeId } from '../types';
import type { Action as ActionCreators } from './action-creators';

export type Position = {|
  x: number,
  y: number,
|};

export type Dimension = {|
  id: Id,
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
  center: Position,
|}

export type DraggableLocation = {|
  droppableId: DroppableId,
  order: number
|};

export type DimensionMap = { [key: Id]: Dimension };

export type DragImpact = {|
  movement: ?{|
    draggables: DraggableId[],
    amount: number,
  |},
  destination: ?DraggableLocation
|}

export type DraggingInitial = {|
  source: DraggableLocation,
  center: Position,
  offset: Position,
  scroll: Position,
  selection: Position,
|}

export type Dragging = {|
    id: DraggableId,
    type: TypeId,
    offset: Position,
    center: Position,
    initial: DraggingInitial,
|}

export type CurrentDrag = {|
    dragging: Dragging,
    impact: DragImpact
|}

export type DragResult = {|
  draggableId: DraggableId,
  source: DraggableLocation,
  // may not have any destination (drag to nowhere)
  destination: ?DraggableLocation
|}

export type State = {
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
  currentDrag: ?CurrentDrag,
  dragResult: ?DragResult,
  requestDimensions: ?TypeId
};

export type Action = ActionCreators;
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
