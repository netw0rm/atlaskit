// @flow
import type {
  DraggableId,
  TypeId,
  Dimension,
  Position,
  Dispatch,
  State,
} from '../types';

export type RequestDimensionsAction = {|
  type: 'REQUEST_DIMENSIONS',
  payload: TypeId
|}

export const requestDimensions = (type: TypeId): RequestDimensionsAction => ({
  type: 'REQUEST_DIMENSIONS',
  payload: type,
});

export type BeginLiftAction = {|
  type: 'BEGIN_LIFT'
|}

const beginLift = (): BeginLiftAction => ({
  type: 'BEGIN_LIFT',
});

export type CompleteLiftAction = {|
  type: 'COMPLETE_LIFT',
  payload: {|
    id: DraggableId,
    type: TypeId,
    center: Position,
    scroll: Position,
    selection: Position,
  |}
|}

const completeLift = (id: DraggableId,
  type: TypeId,
  center: Position,
  scroll: Position,
  selection: Position): CompleteLiftAction => ({
    type: 'COMPLETE_LIFT',
    payload: {
      id,
      type,
      center,
      scroll,
      selection,
    },
  });

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

// using redux-thunk
export const lift = (id: DraggableId,
  type: TypeId,
  center: Position,
  scroll: Position,
  selection: Position,
) => (dispatch: Dispatch, getState: Function) => {
  const state: State = getState();
  if (state.complete && !state.complete.isAnimationFinished) {
    dispatch(dropFinished(id));
  }
  setTimeout(() => {
    dispatch(beginLift());
    dispatch(requestDimensions(type));

    // Dimensions will be requested synronously
    // after they are done - lift.
    // Could improve this by explicitly waiting until all dimensions are published.
    // Could also allow a lift to occur before all the dimensions are published
    setTimeout(() => {
      dispatch(completeLift(id, type, center, scroll, selection));
    });
  });
};

export type Action = BeginLiftAction |
  CompleteLiftAction |
  RequestDimensionsAction |
  PublishDraggableDimensionAction |
  PublishDroppableDimensionAction |
  MoveAction |
  DropAction |
  DropFinishedAction |
  CancelAction;
