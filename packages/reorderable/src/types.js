// @flow

import React from 'react';

// generics
export type ReactClass = typeof React.Component | typeof React.PureComponent | Function;
export type HOC = (component: ReactClass) => ReactClass;
export type Id = string;
export type DraggableId = Id;
export type DroppableId = Id;
export type TypeId = Id;

export type Position = {| x: number, y: number |};

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
  droppableId: ?DroppableId,
  order: ?number
|};

// export type GetId = (props: Object) => ItemId;

// HOC: DragDropContext: root that holds drag state
export type DragDropContext = HOC;

// HOC: Draggable - an item that can be dragged
type DraggableState = {|
  isDragging: boolean,
  getDragHandle: Function
|}

type ProvidedDraggableState = {
  id: DraggableId,
  isDropEnabled?: boolean
}

type ProvideDraggableState = (props: Object) => $Shape<ProvidedDraggableState>;
type MapDraggableStateToProps = (DraggableState) => Object;

type DraggableHooks = {|
  // ? needs to fire before isDropEnabled checks
  onDragStart: (id: DraggableId) => void,
  onDragEnd: (id: DraggableId) => void,
|}

export type Draggable =
  (TypeId, ProvideDraggableState, MapDraggableStateToProps, DraggableHooks) => HOC;

type DroppableState = {|
  draggingId: DraggableId,
  isOver: boolean
|}

type ProvidedDroppableState = {
  id: DraggableId,
  isDropEnabled?: boolean
}

type ProvideDroppableState =
  (props: Object, draggingId: DraggableId) => $Shape<ProvidedDroppableState>;
type MapDroppableStateToProps = (DroppableState) => Object;

type DroppableHooks = {
  isOver: (id: DraggableId) => void,
  onDrop: (id: DraggableId, newPosition: number, oldPosition: number) => void
}

export type Droppable =
  (TypeId, ProvideDroppableState, MapDroppableStateToProps, DroppableHooks) => HOC;
