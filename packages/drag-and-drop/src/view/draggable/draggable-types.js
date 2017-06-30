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
  // Cannot use the typeof right now due to limitation in "react-flow-props-to-prop-types"
  lift: Function, // typeof lift,
  move: Function, // typeof move,
  moveForward: Function, // typeof moveForward,
  moveBackward: Function, // typeof moveBackward,
  drop: Function, // typeof drop,
  cancel: Function, // typeof cancel,
  dropAnimationFinished: Function, // typeof dropAnimationFinished,
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
