// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DroppableDimensionPublisher } from '../dimension-publisher/';
import getDisplayName from '../get-display-name';
import type { TypeId,
  DroppableId,
  DragResult,
  State,
  DraggableLocation,
} from '../../types';

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

type ComponentState = {|
  ref: ?Element,
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
        state: ComponentState

        state: ComponentState = {
          ref: null,
        }

        setRef = (ref: ?Element) => {
          // need to trigger a child render when ref changes
          this.setState({
            ref,
          });
        }

        render() {
          const { id: droppableId } = this.props.provided;

          return (
            <div ref={this.setRef}>
              <DroppableDimensionPublisher
                itemId={droppableId}
                type={type}
                outerRef={this.state.ref}
              >
                <Component {...this.props} />
              </DroppableDimensionPublisher>
            </div>
          );
        }
      }

      const mapStateToProps = (state: State, ownProps: Object): Object => {
        const provided: NeedsProviding = provide(ownProps);
        const { currentDrag } = state;

        if (!currentDrag || !currentDrag.dragging || !currentDrag.impact) {
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
        // console.log({ destination, isDraggingOver });

        return {
          isDraggingOver,
          provided,
        };
      };

      return connect(mapStateToProps, null, null, { storeKey: 'dragDropStore' })(Droppable);
    };
