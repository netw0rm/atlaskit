// @flow

import type {
  DraggableDimension,
  DraggableId,
  DroppableId,
  TypeId,
  ReactElement,
  HTMLElement,
  Position,
} from '../../types';

export type MapProps = {|
  shouldPublish: boolean,
  // null when not dragging
  droppableScroll: ?Position,
|}

export type DispatchProps = {|
  publish: (dimension: DraggableDimension) => mixed,
|}

export type OwnProps = {|
  draggableId: DraggableId,
  droppableId: DroppableId,
  type: TypeId,
  targetRef: ?HTMLElement,
  children?: ReactElement,
|}

export type Props = MapProps & DispatchProps & OwnProps;
