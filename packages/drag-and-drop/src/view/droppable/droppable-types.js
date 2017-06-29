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
  isDropEnabled: boolean,
  type: TypeId,
  children: (Provided, StateSnapshot) => ReactElement
|};

export type DefaultProps = {|
  isDropEnabled: boolean,
  type: TypeId
|}

export type Props = OwnProps & MapProps;
