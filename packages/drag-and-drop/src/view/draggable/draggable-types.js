// @flow
import type { DraggableId, DraggingInitial, Position } from '../../types';

export type NeedsProviding = {|
  id: DraggableId,
  isDragEnabled?: boolean,
|}

export type OwnProps = Object;

export type Provide = (ownProps: OwnProps) => NeedsProviding;

export type MapProps = {|
  id: DraggableId,
  isDragEnabled: boolean,
  isDragging: boolean,
  canAnimate: boolean,
  offset?: Position,
  initial?: DraggingInitial,
|}
