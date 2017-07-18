// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import type {
  State,
  TypeId,
  Position,
  DroppableDimension,
} from '../../types';
import type { DispatchProps, MapProps, OwnProps } from './draggable-dimension-publisher-types';
import { storeKey } from '../context-keys';
import { publishDraggableDimension } from '../../state/action-creators';
import DraggableDimensionPublisher from './draggable-dimension-publisher';

const requestDimensionSelector =
  (state: State): ?TypeId => state.dimension.request;

const getOwnType = (state: State, props: OwnProps): TypeId => props.type;

const droppableScrollSelector = (state: State, props: OwnProps): ?Position => {
  const dimension: ?DroppableDimension = state.dimension.droppable[props.droppableId];
  if (!dimension) {
    return null;
  }
  return dimension.scroll;
};

export const makeSelector = () => {
  const getMapProps = memoizeOne(
    (shouldPublish: boolean, droppableScroll: ?Position): MapProps => {
      if (!shouldPublish || !droppableScroll) {
        return {
          shouldPublish: false,
          droppableScroll: null,
        };
      }
      return {
        shouldPublish: true,
        droppableScroll,
      };
    }
  );

  return createSelector(
    [getOwnType, requestDimensionSelector, droppableScrollSelector],
    (ownType: TypeId, requestId: ?TypeId, droppableScroll: ?Position): MapProps =>
      getMapProps(ownType === requestId, droppableScroll)
  );
};

const makeMapStateToProps = () => {
  const selector = makeSelector();
  return (state: State, props: OwnProps) => selector(state, props);
};

const mapDispatchToProps: DispatchProps = {
  publish: publishDraggableDimension,
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
  null,
  { storeKey }
)(DraggableDimensionPublisher);

