// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import isShallowEqual from 'shallowequal';
import makeDroppable from './make-droppable';
import storeKey from '../../state/get-store-key';
import { dragSelector, pendingDropSelector, phaseSelector } from '../../state/selectors';
import type {
  Phases,
  Direction,
  PendingDrop,
  DragState,
  TypeId,
  State,
  DroppableId,
  DraggableLocation,
} from '../../types';
import type {
  NeedsProviding,
  Provide,
  MapStateToProps,
  Props,
  OwnProps,
  MapProps,
} from './droppable-types';

export const makeSelector = (provide: Provide) => {
  const memoizedProvide = memoizeOne(provide, isShallowEqual);
  const getProvided = (state: State, ownProps: OwnProps) => memoizedProvide(ownProps);

  const getIsDraggingOver = memoizeOne(
    (id: DroppableId, destination: ?DraggableLocation): boolean => {
      if (!destination) {
        return false;
      }
      return destination.droppableId === id;
    }
  );

  const getMapProps = memoizeOne((id: DroppableId, isDraggingOver: boolean): MapProps => ({
    id,
    isDraggingOver,
  }));

  return createSelector(
    [phaseSelector,
      dragSelector,
      pendingDropSelector,
      getProvided,
    ],
    (phase: Phases,
      drag: ?DragState,
      pending: ?PendingDrop,
      provided: NeedsProviding
    ): MapProps => {
      const { id, isDropEnabled = true } = provided;

      if (!isDropEnabled) {
        return getMapProps(id, false);
      }

      if (phase === 'DRAGGING') {
        if (!drag) {
          console.error('cannot determine dragging over as there is not drag');
          return getMapProps(id, false);
        }

        const isDraggingOver = getIsDraggingOver(provided.id, drag.impact.destination);
        return getMapProps(id, isDraggingOver);
      }

      if (phase === 'DROP_ANIMATING') {
        if (!pending) {
          console.error('cannot determine dragging over as there is no pending result');
          return getMapProps(id, false);
        }

        const isDraggingOver = getIsDraggingOver(provided.id, pending.last.impact.destination);
        return getMapProps(id, isDraggingOver);
      }

      return getMapProps(id, false);
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
  mapStateToProps?: MapStateToProps = () => ({})): Function =>
  (Component: ReactClass<any>): ReactClass<any> => {
    const Droppable = makeDroppable(type, mapStateToProps)(Component);
    return connect(
      makeMapStateToProps(provide),
      () => ({}),
      mergeProps,
      { storeKey }
    )(Droppable);
  };

