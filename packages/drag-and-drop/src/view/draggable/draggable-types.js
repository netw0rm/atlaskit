// @flow
import type {
  DraggableId,
  DroppableId,
  DraggingInitial,
  Position,
} from '../../types';
import {
  lift,
  move,
  moveForward,
  moveBackward,
  drop,
  cancel,
  dropFinished,
} from '../../state/action-creators';

export type NeedsProviding = {|
  id: DraggableId,
  droppableId: DroppableId,
  isDragEnabled?: boolean,
|}

export type OwnProps = Object;

export type Provide = (ownProps: OwnProps) => NeedsProviding;

export type DispatchProps = {
  lift: typeof lift,
  move: typeof move,
  moveForward: typeof moveForward,
  moveBackward: typeof moveBackward,
  drop: typeof drop,
  cancel: typeof cancel,
  dropFinished: typeof dropFinished,
}

export type MapProps = {|
  id: DraggableId,
    droppableId: DroppableId,
      isDragEnabled: boolean,
        isDragging: boolean,
          canAnimate: boolean,
            offset ?: Position,
            initial ?: DraggingInitial,
|}

export type Props = {
  mapProps: MapProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps,
}

export type DraggableState = {|
  isDragging: boolean
    |}

export type MapState =
  (state: DraggableState, ownProps: OwnProps, getDragHandle: Function) => Object;
