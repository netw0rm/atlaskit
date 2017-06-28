// @flow
import type { DroppableId, TypeId, ReactElement } from '../../types';

export type Provided = {|
  innerRef: (Element) => mixed,
|}

export type StateSnapshot = {|
  isDraggingOver: boolean,
|}

export type MapProps = {|
  isDraggingOver: boolean,
|}

export type OwnProps = {
  droppableId: DroppableId,
  isDropEnabled: boolean,
  type: TypeId,
  children: (Provided) => ReactElement
};

export type Props = OwnProps & MapProps;
