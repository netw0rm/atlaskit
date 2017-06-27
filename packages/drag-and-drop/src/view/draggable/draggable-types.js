// @flow
import type {
  DraggableId,
  InitialDrag,
  Position,
  TypeId,
} from '../../types';
import type {
  Provided as DragHandleProvided,
} from '../drag-handle/drag-handle-types';
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
  draggableStyle: Object,
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
  isDragging: boolean,
  isDropAnimating: boolean,
  canAnimate: boolean,
  offset: Position,
  initial: ?InitialDrag,
|}

export type OwnProps = {|
  draggableId: DraggableId,
  children: (Provided) => void,
  type: TypeId,
  isDragEnabled: boolean,
|}

export type Props = MapProps & DispatchProps & OwnProps;
