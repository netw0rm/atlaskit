// @flow
import type { Id, TypeId, Action } from '../../types';

export type MapProps = {|
  shouldPublish: boolean,
|}

export type DispatchProps = {|
  publish: Action
|}

export type ConnectedProps = {|
  itemId: Id,
  type: TypeId,
  children?: React$Element<any>,
  targetRef: ?Element
|}

export type Props = ConnectedProps & MapProps & DispatchProps;

