// @flow
import type { Dimension, DraggableLocation, DraggableId, TypeId } from '../types';

import {
  LIFT,
  PUBLISH_DRAGGABLE_DIMENSION,
  PUBLISH_DROPPABLE_DIMENSION,
  MOVE,
  DROP,
  CANCEL,
} from './action-types';

type LiftAction = {|
  type: LIFT,
  payload: {|
    id: DraggableId,
    type: TypeId,
    center: Position,
    offset: Position,
    scroll: Position,
    selection: Position,
    location: DraggableLocation,
  |}
|}

export const lift = (id: DraggableId,
  type: TypeId,
  center: Position,
  offset: Position,
  scroll: Position,
  selection: Position,
  order: number,
  location: DraggableLocation,
): LiftAction => ({
  type: LIFT,
  payload: { id, type, center, offset, scroll, selection, location },
});

type PublishDraggableDimensionAction = {|
  type: PUBLISH_DRAGGABLE_DIMENSION,
  payload: Dimension
|}

export const publishDraggableDimension = (dimension: Dimension): PublishDraggableDimensionAction => ({
  type: PUBLISH_DRAGGABLE_DIMENSION,
  payload: dimension,
});

type PublishDroppableDimensionAction = {|
  type: PUBLISH_DROPPABLE_DIMENSION,
  payload: Dimension
|}

export const publishDroppableDimension = (dimension: Dimension): PublishDroppableDimensionAction => ({
  type: PUBLISH_DROPPABLE_DIMENSION,
  payload: dimension,
});

type MoveAction = {|
  type: MOVE,
  payload: {|
    id: DraggableId,
    offset: Position,
    center: Position
  |}
|}

export const move = (id: DraggableId, offset: Position, center: Position): MoveAction => ({
  type: MOVE,
  payload: {
    id,
    offset,
    center,
  },
});

type DropAction = {
  type: DROP,
  payload: DraggableId
}

export const drop = (id: DraggableId): DropAction => ({
  type: DROP,
  payload: id,
});

type CancelAction = {
  type: CANCEL,
  payload: DraggableId
}

export const cancel = (id: DraggableId): CancelAction => ({
  type: CANCEL,
  payload: id,
});

export type Actions = LiftAction |
  PublishDraggableDimensionAction |
  PublishDroppableDimensionAction |
  MoveAction |
  DropAction |
  CancelAction;
