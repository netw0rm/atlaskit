// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import invariant from 'invariant';
import type { DraggableId, TypeId } from '../../types';
import type {
  Position,
  State,
  DraggableLocation,
  DraggingInitial,
} from '../../state/types';
import DimensionPublisher from '../dimension-publisher/';
import Moveable from '../moveable/';
import createDragHandle from './create-drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getOffset from '../get-offset';
import getDisplayName from '../get-display-name';

import {
  lift as liftAction,
  move as moveAction,
  drop as dropAction,
  cancel as cancelAction,
  dropFinished as dropFinishedAction,
} from '../../state/action-creators';

type NeedsProviding = {|
  id: DraggableId,
  isDragEnabled?: boolean,
|}

type DraggableState = {|
  isDragging: boolean
|}

type Provide = (ownProps: Object) => NeedsProviding;
type MapState = (state: DraggableState, ownProps: Object, getDragHandle: Function) => Object;
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
  dropFinished: typeof dropFinishedAction,
  move: typeof moveAction,
  cancel: typeof cancelAction,
  provided: NeedsProviding,
  isDragging: boolean,
  offset: ?Position,
  initial: ?DraggingInitial,
|};

type ComponentState = {|
  wasDragging: boolean
|}

const Container = styled.div`
  user-select: ${props => (props.isDragging ? 'none' : 'auto')};
`;

export default (type: TypeId,
  provide: Provide,
  map?: MapState = () => empty,
  // getDragHandle?: boolean = false,
  hooks?: Hooks) =>
  (Component: any): any => {
    class WrappedComponent extends PureComponent {
      static displayName = `Draggable(${getDisplayName(Component)})`

      /* eslint-disable react/sort-comp */
      props: Props
      state: ComponentState
      ref: ?Node

      state = {
        wasDragging: false,
      }
      /* eslint-enable */

      static defaultProps = {
        offset: nowhere,
      }

      constructor(props, context) {
        super(props, context);

        this.handle = createDragHandle(this.onLift, this.onMove, this.onDrop, this.onCancel);
      }

      componentWillReceiveProps(nextProps) {
        const wasDragging = this.props.isDragging && !nextProps.isDragging;

        if (this.state.wasDragging !== wasDragging) {
          this.setState({
            wasDragging,
          });
        }
      }

      onMoveEnd = () => {
        if (!this.state.wasDragging) {
          return;
        }

        const { provided: { id }, dropFinished } = this.props;

        dropFinished(id);
      }

      onLift = (selection: Position) => {
        invariant(this.ref != null, 'cannot move an item that is not in the DOM');

        const { provided: { id, isDragEnabled }, lift } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const center: Position = getCenterPosition(this.ref);
        // const offset: Position = { x: 0, y: 0 };
        const scroll: Position = getScrollPosition();
        const location: DraggableLocation = null;

        const offset: Position = getOffset(this.ref);

        lift(id, type, center, offset, scroll, selection, location);
      }

      onMove = (point: Position) => {
        const { provided: { id, isDragEnabled }, initial, move } = this.props;

        if (isDragEnabled === false) {
          throw new Error('need to cancel the current drag');
        }

        invariant(initial != null, 'cannot move an item that has not been lifted');

        const scroll: Position = getScrollPosition();

        // diffs
        const mouseDiff: Position = {
          x: point.x - initial.selection.x,
          y: point.y - initial.selection.y,
        };
        const scrollDiff: Position = {
          x: scroll.x - initial.scroll.x,
          y: scroll.y - initial.scroll.y,
        };
        const diff: Position = {
          x: mouseDiff.x + scrollDiff.x,
          y: mouseDiff.y + scrollDiff.y,
        };

        // adjusted positions
        const offset: Position = {
          x: initial.offset.x + diff.x,
          y: initial.offset.y + diff.y,
        };
        const center: Position = {
          x: initial.center.x + diff.x,
          y: initial.center.y + diff.y,
        };

        move(id, offset, center);
      }

      onDrop = () => {
        const { provided: { id }, drop } = this.props;

        drop(id);
      }

      onCancel = () => {
        console.log('cancelling drag');
      }

      setRef = (ref: Node) => {
        if (ref !== this.ref) {
          // need to pass ref to dimension-publisher
          console.warn('force setting ref');
          this.ref = ref;
          this.forceUpdate();
        }
      }

      handle: Function

      render() {
        const ownProps = this.props;

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return this.handle;
        };

        const snapshot: DraggableState = {
          isDragging: ownProps.isDragging,
        };

        const additionalProps = map(snapshot, ownProps, requestDragHandle);

        // TODO: clear draggable props
        const props = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : this.handle;

        const { id: itemId } = ownProps.provided;

        return (
          <Moveable
            shouldAnimate={this.state.wasDragging}
            destination={ownProps.offset}
            onMoveEnd={this.onMoveEnd}
            innerRef={this.setRef}
          >
            {wrap(
              <DimensionPublisher
                itemId={itemId}
                type={type}
                dimensionType="DRAGGABLE"
              >
                <Container
                  isDragging={ownProps.isDragging}
                >
                  <Component {...props} />
                </Container>
              </DimensionPublisher>
            )}
          </Moveable>
        );
      }
    }

    // TODO: memoize
    const mapStateToProps = (state: State, ownProps: Object) => {
      const provided: NeedsProviding = provide(ownProps);
      const { currentDrag } = state;
      if (!currentDrag || !currentDrag.dragging || currentDrag.dragging.id !== provided.id) {
        return {
          provided,
          isDragging: false,
        };
      }

      const offset = currentDrag.dragging.offset;
      const initial = currentDrag.dragging.initial;

      return {
        provided,
        isDragging: true,
        offset,
        initial,
      };
    };

    const mapDispatchToProps = {
      lift: liftAction,
      move: moveAction,
      drop: dropAction,
      dropFinished: dropFinishedAction,
      cancel: cancelAction,
    };

    return connect(mapStateToProps, mapDispatchToProps, null, { storeKey: 'dragDropStore' })(WrappedComponent);
  };
