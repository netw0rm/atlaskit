// @flow
import type { Id, DroppableId, Action } from '../../types';

export type MapProps = {|
  shouldPublish: boolean,
|}

export type DispatchProps = {|
  publish: Action
|}

export type ConnectedProps = {|
  itemId: Id,
  droppableId?: DroppableId,
  children?: React$Element<any>,
  targetRef: ?Element
|}

export type Props = ConnectedProps & MapProps & DispatchProps;

