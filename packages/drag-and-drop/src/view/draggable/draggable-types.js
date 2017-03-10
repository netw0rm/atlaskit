// @flow
import type { DraggableId, DroppableId, DraggingInitial, Dimension, Position } from '../../types';

export type NeedsProviding = {|
  id: DraggableId,
  droppableId: DroppableId,
  isDragEnabled ?: boolean,
|}

export type OwnProps = Object;

export type Provide = (ownProps: OwnProps) => NeedsProviding;

export type MapProps = {|
  id: DraggableId,
  droppableId: DroppableId,
  isDragEnabled: boolean,
  isDragging: boolean,
  canAnimate: boolean,
  offset?: Position,
  initial?: DraggingInitial,
|}
