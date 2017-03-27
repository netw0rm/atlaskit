// @flow
import type {
  Id,
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

export type PublishDraggableDimensionAction = {|
  type: 'PUBLISH_DRAGGABLE_DIMENSION',
  payload: Dimension
|}

export const publishDraggableDimension =
  (dimension: Dimension): PublishDraggableDimensionAction => ({
    type: 'PUBLISH_DRAGGABLE_DIMENSION',
    payload: dimension,
  });

export type PublishDroppableDimensionAction = {|
  type: 'PUBLISH_DROPPABLE_DIMENSION',
  payload: Dimension
|}

export const publishDroppableDimension =
  (dimension: Dimension): PublishDroppableDimensionAction => ({
    type: 'PUBLISH_DROPPABLE_DIMENSION',
    payload: dimension,
  });

export type MoveAction = {|
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

export type MoveBackwardAction = {|
  type: 'MOVE_BACKWARD',
  payload: DraggableId
|}

export const moveBackward = (id: DraggableId): MoveBackwardAction => ({
  type: 'MOVE_BACKWARD',
  payload: id,
});

export type MoveForwardAction = {|
  type: 'MOVE_FORWARD',
  payload: DraggableId
|}

export const moveForward = (id: DraggableId): MoveForwardAction => ({
  type: 'MOVE_FORWARD',
  payload: id,
});

export type CancelAction = {
  type: 'CANCEL',
  payload: DraggableId
}

export const cancel = (id: DraggableId): CancelAction => ({
  type: 'CANCEL',
  payload: id,
});

export type DropAction = {
  type: 'DROP',
  payload: DraggableId
}

export const drop = (id: DraggableId): DropAction => ({
  type: 'DROP',
  payload: id,
});

export type DropAnimationFinishedAction = {
  type: 'DROP_ANIMATION_FINISHED',
  payload: DraggableId
}

export const dropAnimationFinished = (id: DraggableId): DropAnimationFinishedAction => ({
  type: 'DROP_ANIMATION_FINISHED',
  payload: id,
});

export type LiftAction = {|
  type: 'LIFT',
  payload: {|
    id: DraggableId,
    type: TypeId,
    center: Position,
    scroll: Position,
    selection: Position,
  |}
|}

// using redux-thunk
export const lift = (id: DraggableId,
  type: TypeId,
  center: Position,
  scroll: Position,
  selection: Position,
) => (dispatch: Dispatch, getState: Function) => {
  const state: State = getState();
  if (state.complete && !state.complete.isAnimationFinished) {
    dispatch(dropAnimationFinished(id));
  }
  // https://github.com/chenglou/react-motion/issues/437
  // need to allow a flush of react-motion
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

export type UpdateDimensionScrollTopAction = {
  type: 'UPDATE_DIMENSION_SCROLL_TOP',
  payload: {|
    id: Id,
    scrollTop: number,
  |}
}

export const updateDimensionScrollTop =
  (id: Id, scrollTop: number): UpdateDimensionScrollTopAction => ({
    type: 'UPDATE_DIMENSION_SCROLL_TOP',
    payload: {
      id,
      scrollTop,
    },
  });

export type Action = BeginLiftAction |
  CompleteLiftAction |
  RequestDimensionsAction |
  PublishDraggableDimensionAction |
  PublishDroppableDimensionAction |
  MoveAction |
  MoveBackwardAction |
  MoveForwardAction |
  DropAction |
  DropAnimationFinishedAction |
  CancelAction |
  UpdateDimensionScrollTopAction;
