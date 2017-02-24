// @flow
import type { DraggableId, TypeId } from '../types';
import type { Dimension, Position, Dispatch } from './types';

export type RequestDimensionsAction = {|
  type: 'REQUEST_DIMENSIONS',
  payload: TypeId
|}

export const requestDimensions = (type: TypeId): RequestDimensionsAction => ({
  type: 'REQUEST_DIMENSIONS',
  payload: type,
});

export type LiftAction = {|
  type: 'LIFT',
  payload: {|
    id: DraggableId,
    type: TypeId,
    center: Position,
    offset: Position,
    scroll: Position,
    selection: Position,
  |}
|}

const lift = (id: DraggableId,
  type: TypeId,
  center: Position,
  offset: Position,
  scroll: Position,
  selection: Position): LiftAction => ({
    type: 'LIFT',
    payload: {
      id,
      type,
      center,
      offset,
      scroll,
      selection,
    },
  });

// using redux-thunk
export const beginLift = (id: DraggableId,
  type: TypeId,
  center: Position,
  offset: Position,
  scroll: Position,
  selection: Position,
) => (dispatch: Dispatch) => {
  dispatch(requestDimensions(type));

  // Dimensions will be requested synronously
  // after they are done - lift.
  // Could improve this by explicitly waiting until all dimensions are published.
  // Could also allow a lift to occur before all the dimensions are published
  setTimeout(() => {
    dispatch(lift(id, type, center, offset, scroll, selection));
  });
};

type PublishDraggableDimensionAction = {|
  type: 'PUBLISH_DRAGGABLE_DIMENSION',
  payload: Dimension
|}

export const publishDraggableDimension = (dimension: Dimension): PublishDraggableDimensionAction => ({
  type: 'PUBLISH_DRAGGABLE_DIMENSION',
  payload: dimension,
});

type PublishDroppableDimensionAction = {|
  type: 'PUBLISH_DROPPABLE_DIMENSION',
  payload: Dimension
|}

export const publishDroppableDimension = (dimension: Dimension): PublishDroppableDimensionAction => ({
  type: 'PUBLISH_DROPPABLE_DIMENSION',
  payload: dimension,
});

type MoveAction = {|
  type: 'MOVE',
  payload: {|
    id: DraggableId,
    offset: Position,
    center: Position
  |}
|}

export const move = (id: DraggableId, offset: Position, center: Position): MoveAction => ({
  type: 'MOVE',
  payload: {
    id,
    offset,
    center,
  },
});

type DropAction = {
  type: 'DROP',
  payload: DraggableId
}

export const drop = (id: DraggableId): DropAction => ({
  type: 'DROP',
  payload: id,
});

type DropFinishedAction = {
  type: 'DROP_FINISHED',
  payload: DraggableId
}

export const dropFinished = (id: DraggableId): DropFinishedAction => ({
  type: 'DROP_FINISHED',
  payload: id,
});

type CancelAction = {
  type: 'CANCEL',
  payload: DraggableId
}

export const cancel = (id: DraggableId): CancelAction => ({
  type: 'CANCEL',
  payload: id,
});

export type Action = LiftAction |
  RequestDimensionsAction |
  PublishDraggableDimensionAction |
  PublishDroppableDimensionAction |
  MoveAction |
  DropAction |
  DropFinishedAction |
  CancelAction;
