// @flow
import { createSelector } from 'reselect';
import type { State, TypeId } from '../../types';
import type { MapProps } from './dimension-publisher-types';

const requestDimensionSelector =
  (state: State): ?TypeId => state.requestDimensions;

const getOwnType = (state, props): TypeId => props.type;

export default () => createSelector(
  [requestDimensionSelector, getOwnType],
  (type: ?TypeId, ownType: TypeId): MapProps => {
    if (!type) {
      return {
        shouldPublish: false,
      };
    }

    return {
      shouldPublish: type === ownType,
    };
  }
);
