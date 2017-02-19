// @flow
import React, { PureComponent } from 'react';
import type { DraggableId, TypeId } from '../../types';
import Movable from './movable';
import createDragHandle from './create-drag-handle-new';
// import Draggable from './move;

type NeedsProviding = {|
  id: DraggableId,
  isDropEnabled?: boolean
|}

type DraggableState = {|
  isDragging: boolean
|}

type Provide = (ownProps: Object) => NeedsProviding;
type MapState = (ownProps: Object, state: DraggableState, getDragHandle: Function) => Object;
type Hooks = {|
  // ? needs to fire before isDropEnabled checks
  onDragStart: (id: DraggableId) => void,
  onDragEnd: (id: DraggableId) => void,
|}

const empty = {};
const identity = x => x;

export default (type: TypeId,
provide: Provide,
map?: MapState = () => empty,
// getDragHandle?: boolean = false,
hooks?: Hooks) =>
  (Component: any): any => {
    console.log('args', type, provide, map, hooks, Component);

    class WrappedComponent extends PureComponent {

      state: DraggableState
      handle: Function

      constructor(props, context) {
        super(props, context);
        this.handle = createDragHandle(this.onLift, this.onMove, this.onDrop, this.onCancel);
      }

      onMouseDown = (event: SyntheticMouseEvent) => {
        console.log('onMouseDown', event);
      }

      onKeyUp = (event: SyntheticKeyboardEvent) => {
        console.log('onKeyUp', event);
      }

      onMoveEnd = () => {
        console.log('onMoveEnd');
      }

      onLift = (point: Position) => {
        console.info('draggable lifted at', point);
      }

      onMove = (point: Position) => {
        console.log('draggable moving to', point);
      }

      onDrop = (point: Position) => {
        console.log('dropping on', point);
      }

      onCancel = () => {
        console.log('cancelling drag');
      }

      render() {
        const ownProps = this.props;

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return this.handle;
        };

        const provided: NeedsProviding = provide(ownProps);

        // console.log('created handle', handle);

        // const dragHandle = x => x;
        const additionalProps = map(ownProps, this.state, requestDragHandle);

        const props = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : this.handle;

        return wrap(
          <div>
            <Movable
              origin={{ x: 0, y: 0 }}
              offset={{ x: 0, y: 0 }}
              onMoveEnd={this.onMoveEnd}
            >
              <Component {...props} />
            </Movable>
          </div>
        );
      }
  }

    // TODO: connect to redux store
    return WrappedComponent;
  };
