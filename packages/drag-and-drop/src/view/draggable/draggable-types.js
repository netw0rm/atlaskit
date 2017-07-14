// @flow
/* eslint-disable import/no-extraneous-dependencies*/
// $ExpectError - not added to project deps
import type { PropType, HasDefaultProp } from 'babel-plugin-react-flow-props-to-prop-types';
/* eslint-enable */

import type {
  DraggableId,
  InitialDrag,
  Position,
  TypeId,
  ZIndex,
  HTMLElement,
  ReactElement,
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
import type {
  Provided as DragHandleProvided,
} from '../drag-handle/drag-handle-types';

export type DraggingStyle = {|
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: ZIndex,
  width: number,
  height: number,
  transform: ?string,
|}

export type NotDraggingStyle = {|
  transition: ?string,
  transform: ?string,
|}

export type DraggableStyle = DraggingStyle | NotDraggingStyle;

export type ZIndexOptions = {|
  dragging: number,
  dropAnimating: number,
|}

export type Provided = {|
  innerRef: (HTMLElement) => void,
  draggableStyle: ?DraggableStyle,
  dragHandleProps: ?DragHandleProvided,
  placeholder: ?ReactElement,
|}

export type StateSnapshot = {|
  isDragging: boolean,
|}

// Using PropType<*,*> to allow strict typing within code and looser typing
// for React PropTypes
// https://github.com/thejameskyle/babel-plugin-react-flow-props-to-prop-types#override-type-used-in-proptypes
export type DispatchProps = {
  lift: PropType<typeof lift, Function>,
  move: PropType<typeof move, Function>,
  moveForward: PropType<typeof moveForward, Function>,
  moveBackward: PropType<typeof moveBackward, Function>,
  drop: PropType<typeof drop, Function>,
  cancel: PropType<typeof cancel, Function>,
  dropAnimationFinished: PropType<typeof dropAnimationFinished, Function>,
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
  children: (Provided, StateSnapshot) => ?ReactElement,
  type: HasDefaultProp<TypeId>,
  isDragDisabled: HasDefaultProp<boolean>,
|}

export type DefaultProps = {|
  type: TypeId,
  isDragDisabled: boolean,
|}

export type Props = MapProps & DispatchProps & OwnProps;
