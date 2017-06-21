// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import storeKey from '../../state/get-store-key';
import { dragSelector, pendingDropSelector, phaseSelector } from '../../state/selectors';
import Droppable from './droppable';
import type {
  Phase,
  PendingDrop,
  DragState,
  State,
  DroppableId,
  DraggableLocation,
} from '../../types';
import type {
  OwnProps,
  MapProps,
} from './droppable-types';

export const makeSelector = () => {
  const idSelector = (state: State, ownProps: OwnProps) => ownProps.droppableId;
  const isDropEnabledSelector = (state: State, ownProps: OwnProps) => ownProps.isDropEnabled || true;

  const getIsDraggingOver = memoizeOne(
    (id: DroppableId, destination: ?DraggableLocation): boolean => {
      if (!destination) {
        return false;
      }
      return destination.droppableId === id;
    }
  );

  const getMapProps = memoizeOne((isDraggingOver: boolean): MapProps => ({
    isDraggingOver,
  }));

  return createSelector(
    [phaseSelector,
      dragSelector,
      pendingDropSelector,
      idSelector,
      isDropEnabledSelector,
    ],
    (phase: Phase,
      drag: ?DragState,
      pending: ?PendingDrop,
      id: DroppableId,
      isDropEnabled: boolean,
    ): MapProps => {
      if (!isDropEnabled) {
        return getMapProps(false);
      }

      if (phase === 'DRAGGING') {
        if (!drag) {
          console.error('cannot determine dragging over as there is not drag');
          return getMapProps(false);
        }

        const isDraggingOver = getIsDraggingOver(id, drag.impact.destination);
        return getMapProps(isDraggingOver);
      }

      if (phase === 'DROP_ANIMATING') {
        if (!pending) {
          console.error('cannot determine dragging over as there is no pending result');
          return getMapProps(false);
        }

        const isDraggingOver = getIsDraggingOver(id, pending.last.impact.destination);
        return getMapProps(isDraggingOver);
      }

      return getMapProps(false);
    }
  );
};

const makeMapStateToProps = () => {
  const selector = makeSelector();
  return (state: State, props: OwnProps) => selector(state, props);
};

export default connect(
  makeMapStateToProps(),
  null,
  null,
  { storeKey }
)(Droppable);
