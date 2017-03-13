// @flow
import type { Id, Action } from '../../types';

export type MapProps = {|
  shouldPublish: boolean,
|}

export type DispatchProps = {|
  publish: Action
|}

export type ConnectedProps = {|
  itemId: Id,
  children?: React$Element<any>,
  targetRef: ?Element
|}

export type Props = ConnectedProps & MapProps & DispatchProps;

