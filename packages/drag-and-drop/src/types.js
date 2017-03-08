// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Action as ActionCreators } from './state/action-creators';

export type Id = string;
export type DraggableId = Id;
export type DroppableId = Id;
export type TypeId = Id;

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

export type DraggingInitial = {|
  source: DraggableLocation,
  center: Position,
  scroll: Position,
  selection: Position,
|}

export type Dragging = {|
  id: DraggableId,
  type: TypeId,
  offset: Position,
  center: Position,
  initial: DraggingInitial,
  shouldAnimate: boolean,
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

export type DragComplete = {|
  result: DragResult,
  last: CurrentDrag,
  newHomeOffset: Position,
  isAnimationFinished: boolean,
|}

export type Direction = 'vertical'; // | horiztonal - currently not supported

export type State = {
  draggableDimensions: DimensionMap,
  droppableDimensions: DimensionMap,
  isProcessingLift: boolean,
  currentDrag: ?CurrentDrag,
  complete: ?DragComplete,
  requestDimensions: ?TypeId,
};

export type Action = ActionCreators;
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
