// @flow
import type {
  DraggableId,
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
  dropAnimationFinished,
} from '../../state/action-creators';

export type NeedsProviding = {|
  id: DraggableId,
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
  dropAnimationFinished: typeof dropAnimationFinished,
}

export type MapProps = {|
  id: DraggableId,
  isDragEnabled: boolean,
  isDragging: boolean,
  isDropAnimating: boolean,
  canAnimate: boolean,
  offset: Position,
  initial?: DraggingInitial,
|}

export type Props = {
  mapProps: MapProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps,
}

export type StateSnapshot = {|
  isDragging: boolean
|}

export type MapState =
  (state: StateSnapshot, ownProps: OwnProps, getDragHandle: Function) => Object;
