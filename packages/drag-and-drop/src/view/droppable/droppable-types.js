// @flow
import type { DroppableId } from '../../types';

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
  children: (Provided) => mixed
};

export type Props = OwnProps & MapProps;
