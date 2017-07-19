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

export type DimensionFragment = {|
  top: number,
  left: number,
  bottom: number,
  right: number,
  width: number,
  height: number,
  center: Position,
|}

export type DraggableDimension = {|
  id: DraggableId,
  droppableId: DroppableId,
  withMargin: DimensionFragment,
  withoutMargin: DimensionFragment,
|}

export type DroppableDimension = {|
  id: DroppableId,
  scroll: {|
    initial: Position,
    current: Position,
  |},
  withMargin: DimensionFragment,
  withoutMargin: DimensionFragment,
|}
export type DraggableLocation = {|
  droppableId: DroppableId,
  index: number
|};

export type DraggableDimensionMap = { [key: DraggableId]: DraggableDimension };
export type DroppableDimensionMap = { [key: DroppableId]: DroppableDimension };

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
  // client + window scroll (page)
  withoutDroppableScroll: {|
    page: Position,
    center: Position,
  |},
  // client + window scroll + droppable scroll
  withDroppableScroll: {|
    center: Position,
  |},
  // droppableScroll: Position,
  // required for placeholder positioning
  dimension: DraggableDimension,
|}

export type CurrentDrag = {|
  id: DraggableId,
  type: TypeId,
  withoutDroppableScroll: {|
    // the current mouse position of the dragging item
    page: Position,
    // the center position of the current item
    center: Position,
    // how far the element has moved from its original selection (page).
    offset: Position,
  |},
  withDroppableScroll: {|
    center: Position,
    offset: Position,
  |},
  shouldAnimate: boolean,
|}

export type DropResult = {|
  draggableId: DraggableId,
  source: DraggableLocation,
  // may not have any destination (drag to nowhere)
  destination: ?DraggableLocation
|}

export type DragState = {|
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

export type Phase = 'IDLE' | 'COLLECTING_DIMENSIONS' | 'DRAGGING' | 'DROP_ANIMATING' | 'DROP_COMPLETE';

export type DimensionState = {|
  request: ?TypeId,
  draggable: DraggableDimensionMap,
  droppable: DroppableDimensionMap,
|};

export type DropState = {|
  pending: ?PendingDrop,
  result: ?DropResult,
|}

export type State = {
  phase: Phase,
  dimension: DimensionState,
  // null if not dragging
  drag: ?DragState,
  drop: ?DropState,
};

export type Action = ActionCreators;
export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

export type Hooks = {|
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd: (result: DropResult) => void,
|}

// These types are 'fake'. They really just resolve to 'any'.
// But it is useful for readability and intention
export type ReactClass = any;
export type ReactElement = any;
export type HTMLElement = any;

export type HOC = (Component: ReactClass) => ReactClass;
