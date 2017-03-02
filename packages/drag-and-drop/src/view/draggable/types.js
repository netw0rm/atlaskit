// @flow
import type { DraggableId, DraggingInitial, Position } from '../../types';

export type NeedsProviding = {|
  id: DraggableId,
  isDragEnabled?: boolean,
|}

export type Provide = (ownProps: Object) => NeedsProviding;

export type MapProps = {|
  id: DraggableId,
  isDragEnabled: boolean,
  isDragging: boolean,
  canAnimate: boolean,
  offset?: Position,
  initial?: DraggingInitial,
|}
