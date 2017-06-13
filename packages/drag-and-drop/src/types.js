// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Action as ActionCreators } from './state/action-creators';

export type Id = string;
export type DraggableId = Id;
export type DroppableId = Id;
export type TypeId = Id;
export type ZIndex = number | string;

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
  index: number
|};

export type DimensionMap = { [key: Id]: Dimension };

export type DragMovement = {|
  draggables: DraggableId[],
  amount: number,
  isMovingForward: boolean,
|}

export type DragImpact = {|
  movement: DragMovement,
  destination: ?DraggableLocation
|}

export type InitialDrag = {|
  source: DraggableLocation,
  center: Position,
  scroll: Position,
  selection: Position,
  dimension: Dimension,
|}

export type CurrentDrag = {|
  id: DraggableId,
  type: TypeId,
  offset: Position,
  center: Position,
  shouldAnimate: boolean,
|}

export type DropResult = {|
  draggableId: DraggableId,
  source: DraggableLocation,
  // may not have any destination (drag to nowhere)
  destination: ?DraggableLocation
|}

type DragState = {|
  initial: InitialDrag,
  current: CurrentDrag,
  impact: DragImpact,
|}

export type PendingDrop = {|
  newHomeOffset: Position,
  last: DragState,
  result: DropResult,
|}

export type Direction = 'vertical'; // | horiztonal - currently not supported

export type Phases = 'IDLE' | 'COLLECTING_DIMENSIONS' | 'DRAGGING' | 'DROP_ANIMATING' | 'DROP_COMPLETE';

type DimensionState = {|
  request: ?TypeId,
  draggable: DimensionMap,
  droppable: DimensionMap,
|};

type DropState = {|
  pending: ?PendingDrop,
  result: ?DropResult,
|}

export type State = {
  phase: Phases,
  dimension: DimensionState,
  // null if not dragging
  drag: ?DragState,
  drop: ?DropState,
};

export type Action = ActionCreators;
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
