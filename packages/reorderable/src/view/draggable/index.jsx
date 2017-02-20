// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { DraggableId, TypeId } from '../../types';
import type { Position, State, DraggableLocation } from '../../state/types';
import Moveable from './moveable';
import createDragHandle from './create-drag-handle';
import getCenterPosition from './get-center-position';
import getScrollPosition from './get-scroll-position';

import {
  lift as liftAction,
  move as moveAction,
  drop as dropAction,
  cancel as cancelAction,
} from '../../state/action-creators';

type NeedsProviding = {|
  id: DraggableId,
  isDragEnabled ?: boolean,
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
const nowhere: Position = { x: 0, y: 0 };

type Props = {|
  lift: typeof liftAction,
  move: typeof moveAction,
  drop: typeof dropAction,
  move: typeof moveAction,
  cancel: typeof cancelAction,
  provided: NeedsProviding,
  isDragging: boolean,
  offset: ?Position,
|};

const Container = styled.div`
  user-select: ${props => (props.isDragging ? 'none' : 'auto')};
  border: ${props => (props.isDragging ? '5px solid blue' : 'none')};
`;

export default (type: TypeId,
  provide: Provide,
  map?: MapState = () => empty,
  // getDragHandle?: boolean = false,
  hooks?: Hooks) =>
  (Component: any): any => {
    console.log('args', type, provide, map, hooks, Component);

    class WrappedComponent extends PureComponent {
      // eslint-disable-next-line react/sort-comp
      props: Props
      ref: Node

      static defaultProps = {
        offset: nowhere,
      }

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

      onLift = (selection: Position) => {
        const { provided: { id, isDragEnabled }, lift } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const center: Position = getCenterPosition(this.ref);
        const offset: Position = { x: 0, y: 0 };
        const scroll: Position = getScrollPosition();
        const location: DraggableLocation = null;

        lift(id, type, center, offset, scroll, selection, location);
      }

      onMove = (point: Position) => {
        const { provided: { id, isDragEnabled }, move } = this.props;

        if (isDragEnabled === false) {
          throw new Error('need to cancel the current drag');
        }

        const center: Position = getCenterPosition(this.ref);

        move(id, point, center);
      }

      onDrop = (point: Position) => {
        console.log('dropping on', point);
      }

      onCancel = () => {
        console.log('cancelling drag');
      }

      setRef = (ref: Node) => {
        this.ref = ref;
      }

      handle: Function

      render() {
        const ownProps = this.props;

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return this.handle;
        };

        const additionalProps = map(ownProps, this.state, requestDragHandle);

        // TODO: clear draggable props
        const props = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : this.handle;

        return (
          <Moveable
            shouldAnimate={false}
            destination={ownProps.offset}
            onMoveEnd={this.onMoveEnd}
          >
            {wrap(
              <Container isDragging={ownProps.isDragging} innerRef={this.setRef}>
                <Component {...props} />
              </Container>
            )}
          </Moveable>
        );
      }
    }

    const mapStateToProps = (state: State, ownProps: Object) => {
      const provided: NeedsProviding = provide(ownProps);
      const { currentDrag } = state;

      const isDragging = currentDrag && currentDrag.dragging.id === provided.id;
      const offset = (isDragging && currentDrag.dragging.offset) || undefined;

      return {
        provided,
        isDragging,
        offset,
      };
    };

    const mapDispatchToProps = {
      lift: liftAction,
      move: moveAction,
      drop: dropAction,
      cancel: cancelAction,
    };

    return connect(mapStateToProps, mapDispatchToProps, null, { storeKey: 'dragDropStore' })(WrappedComponent);
  };
