// @flow
import type { DroppableId } from '../../types';

export type NeedsProviding = {|
  id: DroppableId,
  isDropEnabled?: boolean
|}

export type MapProps = {|
  id: DroppableId,
  isDraggingOver: boolean,
|}

export type OwnProps = Object;

export type Props = {|
  ownProps: OwnProps,
  mapProps: MapProps,
|}

export type StateSnapshot = {|
  isDraggingOver: boolean
|}

export type Provide = (ownProps: OwnProps) => NeedsProviding;
export type MapStateToProps = (state: StateSnapshot, ownProps: OwnProps) => Object;
