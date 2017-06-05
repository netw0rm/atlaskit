// @flow
import type { Dimension, Id, TypeId, Action } from '../../types';

export type MapProps = {|
  shouldPublish: boolean,
|}

export type DispatchProps = {|
  publish: Action
|}

export type ConnectedProps = {|
  itemId: Id,
  type: TypeId,
  children?: any,
  targetRef: ?Element
|}

export type Props = {
  itemId: Id,
  targetRef: ?Element,
  publish: (dimension: Dimension) => void,
  shouldPublish: boolean,
  children?: any,
}
