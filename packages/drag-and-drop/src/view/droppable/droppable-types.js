// @flow
import type { DroppableId, TypeId, ReactElement } from '../../types';

export type Provided = {|
  isDraggingOver: boolean,
  innerRef: (Element) => mixed,
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
