// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import type { Action, State, TypeId } from '../../types';
import type { DispatchProps, MapProps, ConnectedProps } from './dimension-publisher-types';
import storeKey from '../../state/get-store-key';
import DimensionPublisher from './dimension-publisher';

const requestDimensionSelector =
  (state: State): ?TypeId => state.dimension.request;

const getOwnType = (state: State, props: ConnectedProps): TypeId => props.type;

const getMapProps = memoizeOne(
  (shouldPublish: boolean): MapProps => ({
    shouldPublish,
  })
);

const makeSelector = () => createSelector(
  [requestDimensionSelector, getOwnType],
  (type: ?TypeId, ownType: TypeId): MapProps => {
    if (!type) {
      return getMapProps(false);
    }

    return getMapProps(type === ownType);
  }
);

const makeMapStateToProps = () => {
  const selector = makeSelector();
  return (state: State, props: ConnectedProps) => selector(state, props);
};

export default (publish: Action): ReactClass<any> => {
  const mapDispatchToProps: DispatchProps = {
    publish,
  };

  return connect(
    makeMapStateToProps,
    mapDispatchToProps,
    null,
    { storeKey }
  )(DimensionPublisher);
};
