// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DimensionPublisher from '../dimension-publisher/';
import getDisplayName from '../get-display-name';
import type { TypeId, DroppableId } from '../../types';
import type { DragResult, State, DraggableLocation } from '../../state/types';

type DroppableState = {|
  isDraggingOver: boolean
|}

type NeedsProviding = {|
  id: DroppableId,
  isDropEnabled?: boolean
|}

type Provide = (ownProps: Object) => NeedsProviding;

type MapState = (state: DroppableState, ownProps: Object) => Object;

type Hooks = {|
  onDrop: (id: DragResult) => void,
  isDraggingOver: (id: DroppableId) => void,
|}

type Props = {|
  provided: NeedsProviding,
|}

export default (type: TypeId,
  provide: Provide,
  map?: MapState = () => ({}),
  hooks?: Hooks) =>
    // Component must be a styled-component
    (Component: any): any => {
      class Droppable extends PureComponent {
        static displayName = `Droppable(${getDisplayName(Component)})`

        props: Props

        render() {
          const { id: droppableId } = this.props.provided;

          return (
            <DimensionPublisher
              itemId={droppableId}
              type={type}
              dimensionType="DROPPABLE"
            >
              <Component {...this.props} />
            </DimensionPublisher>
          );
        }
      }

      const mapStateToProps = (state: State, ownProps: Object): Object => {
        const provided: NeedsProviding = provide(ownProps);
        const { currentDrag } = state;

        if (!currentDrag || !currentDrag.dragging) {
          return {
            isDraggingOver: false,
            provided,
          };
        }

        // is this check needed - or can we use the next one?
        // if (currentDrag.dragging.type !== type) {
        //   return notDraggingOver;
        // }

        // type is equal - now need to know if you are dragging over this specific droppable
        const destination: ?DraggableLocation = currentDrag.impact.destination;

        const isDraggingOver = Boolean(destination && destination.droppableId === provided.id);

        return {
          isDraggingOver,
          provided,
        };
      };

      return connect(mapStateToProps, null, null, { storeKey: 'dragDropStore' })(Droppable);
    };
