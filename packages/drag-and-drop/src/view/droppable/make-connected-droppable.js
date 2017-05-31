// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import makeDroppable from './make-droppable';
import storeKey from '../../state/get-store-key';
import { currentDragSelector } from '../../state/selectors';
import type { Direction, TypeId, State, CurrentDrag, DraggableLocation } from '../../types';
import type { NeedsProviding, Provide, MapState, Props, OwnProps, MapProps } from './droppable-types';

const makeSelector = (provide: Provide) => {
  const memoizedProvide = memoizeOne(provide, isShallowEqual);
  const getProvided = (state: State, ownProps: OwnProps) => memoizedProvide(ownProps);

  return createSelector(
        [currentDragSelector, getProvided],
        (currentDrag: ?CurrentDrag, provided: NeedsProviding): MapProps => {
          const { id, isDropEnabled = true } = provided;

          if (!currentDrag || !isDropEnabled) {
            return {
              id,
              isDraggingOver: false,
            };
          }

          const destination: ?DraggableLocation = currentDrag.impact.destination;
          const isDraggingOver = Boolean(
                destination &&
                destination.droppableId === provided.id
            );

          return {
            id,
            isDraggingOver,
          };
        }
    );
};

const mergeProps = (mapProps: MapProps,
    dispatchProps: any,
    ownProps: OwnProps): Props => ({
      mapProps,
      ownProps,
    });

const makeMapStateToProps = (provide: Provide) => {
  const selector = makeSelector(provide);
  return (state: State, props: OwnProps) =>
        selector(state, props);
};

export default (type: TypeId,
    direction: Direction,
    provide: Provide,
    map?: MapState = () => ({})): Function =>
    (Component: ReactClass<any>): ReactClass<any> => {
      const Droppable = makeDroppable(type, map)(Component);
      return connect(
        makeMapStateToProps(provide),
        () => ({}),
        mergeProps,
        { storeKey }
      )(Droppable);
    };

