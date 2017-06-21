// @flow
import type {
  DraggableId,
  InitialDrag,
  Position,
  TypeId,
} from '../../types';
import type { DragHandleProvided } from '../drag-handle/';
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

export type Provided = {|
  innerRef: (Element) => void,
  isDragging: boolean,
  containerStyle: Object,
  placeholder: ReactElement,
  dragHandleProps: ?DragHandleProvided,
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
  isDragEnabled: boolean,
  isDragging: boolean,
  isDropAnimating: boolean,
  canAnimate: boolean,
  offset: Position,
  initial: ?InitialDrag,
|}

export type OwnProps = {|
  draggableId: DraggableId,
  isDragEnabled: boolean,
  type: TypeId,
  children: (Provided) => mixed,
|}

export type Props = MapProps & DispatchProps & OwnProps;
