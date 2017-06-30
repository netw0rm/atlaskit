// @flow
import type { DroppableId, TypeId, ReactElement } from '../../types';

export type Provided = {|
  innerRef: (Element) => void,
|}

export type StateSnapshot = {|
  isDraggingOver: boolean,
|}

export type MapProps = {|
  isDraggingOver: boolean,
|}

export type OwnProps = {|
  droppableId: DroppableId,
  isDropDisabled: boolean,
  type: TypeId,
  children: (Provided, StateSnapshot) => ReactElement
|};

export type DefaultProps = {|
  isDropDisabled: boolean,
  type: TypeId
|}

export type Props = OwnProps & MapProps;
