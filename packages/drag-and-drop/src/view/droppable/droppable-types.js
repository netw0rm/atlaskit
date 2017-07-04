// @flow
import type { HasDefaultProp } from 'babel-plugin-react-flow-props-to-prop-types';
import type { DroppableId, TypeId, ReactElement, HTMLElement } from '../../types';

export type Provided = {|
  innerRef: (HTMLElement) => void,
|}

export type StateSnapshot = {|
  isDraggingOver: boolean,
|}

export type MapProps = {|
  isDraggingOver: boolean,
|}

export type OwnProps = {|
  droppableId: DroppableId,
  isDropDisabled: HasDefaultProp<boolean>,
  type: HasDefaultProp<TypeId>,
  children: (Provided, StateSnapshot) => ReactElement
|};

export type DefaultProps = {|
  isDropDisabled: boolean,
  type: TypeId
|}

export type Props = OwnProps & MapProps;
