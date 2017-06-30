// @flow
import type {
  DraggableId,
  InitialDrag,
  Position,
  TypeId,
  ZIndex,
} from '../../types';
import type {
  Provided as DragHandleProvided,
} from '../drag-handle/drag-handle-types';
import type {
  Style as MovementStyle,
} from '../moveable/moveable-types';
import {
  lift,
  move,
  moveForward,
  moveBackward,
  drop,
  cancel,
  dropAnimationFinished,
} from '../../state/action-creators';

type ReactElement = mixed;

export type PlacementStyle = {|
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: ZIndex,
  width: number,
  height: number,
  top: number,
  left: number,
|}

export type DraggableStyle = MovementStyle | (PlacementStyle & MovementStyle);

export type Provided = {|
  innerRef: (Element) => void,
  draggableStyle: ?DraggableStyle,
  dragHandleProps: ?DragHandleProvided,
  placeholder: ?ReactElement,
|}

export type StateSnapshot = {|
  isDragging: boolean,
|}

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
  isDragging: boolean,
  isDropAnimating: boolean,
  canAnimate: boolean,
  offset: Position,
  initial: ?InitialDrag,
|}

export type OwnProps = {|
  draggableId: DraggableId,
  children: (Provided, StateSnapshot) => void,
  type: TypeId,
  isDragEnabled: boolean,
|}

export type DefaultProps = {|
  type: TypeId,
  isDragEnabled: boolean,
|}

export type Props = MapProps & DispatchProps & OwnProps;
