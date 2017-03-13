// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import invariant from 'invariant';
import type {
  TypeId,
  Position,
} from '../../types';
import type { Props, MapState, DraggableState } from './draggable-types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import type { Speed } from '../moveable';
import createDragHandle from './create-drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getDisplayName from '../get-display-name';

const identity = x => x;
const noWhere: Position = { x: 0, y: 0 };

type ComponentState = {|
  wasDragging: boolean,
  ref: ?Element,
  childRef: ?Element,
|}

const Container = styled.div`
  user-select: none;
`;

type Movement = {|
  speed: Speed,
  zIndex: string
|}

const getMovement = (isDragging: boolean,
  wasDragging: boolean,
  canAnimate: boolean) => {
  if (isDragging) {
    return {
      speed: canAnimate ? 'FAST' : 'NONE',
      zIndex: '100',
    };
  }

  if (!canAnimate) {
    return {
      speed: 'NONE',
      zIndex: 'auto',
    };
  }

  if (wasDragging) {
    return {
      speed: 'STANDARD',
      zIndex: '50',
    };
  }

  return {
    speed: 'FAST',
    zIndex: 'auto',
  };
};

export default (type: TypeId, map: MapState): Function =>
  (Component: ReactClass<any>): ReactClass<any> =>
    class Draggable extends PureComponent {
      /* eslint-disable react/sort-comp */
      props: Props
      state: ComponentState
      getHandle: Function

      state: ComponentState = {
        wasDragging: false,
        ref: null,
        childRef: null,
      }

      static displayName = `Draggable(${getDisplayName(Component)})`

      static defaultProps = {
        offset: noWhere,
      }
      /* eslint-enable */

      constructor(props, context) {
        super(props, context);

        this.getHandle = createDragHandle({
          onLift: this.onLift,
          onMove: this.onMove,
          onDrop: this.onDrop,
          onCancel: this.onCancel,
          onKeyLift: this.onKeyLift,
          onMoveBackward: this.onMoveBackward,
          onMoveForward: this.onMoveForward,
        });
      }

      componentWillReceiveProps(nextProps) {
        const wasDragging = this.props.mapProps.isDragging &&
          !nextProps.mapProps.isDragging;

        if (this.state.wasDragging !== wasDragging) {
          this.setState({
            wasDragging,
          });
        }
      }

      componentWillUnmount() {
        // console.warn('unmounting draggable', this.props.id);
      }

      onMoveEnd = () => {
        if (!this.state.wasDragging) {
          return;
        }

        const { mapProps: { id }, dispatchProps: { dropFinished } } = this.props;

        dropFinished(id);

        this.setState({
          wasDragging: false,
        });
      }

      onLift = (selection: Position) => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const {
          mapProps: { id, isDragEnabled },
          dispatchProps: { lift },
        } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.ref);

        lift(id, type, center, scroll, selection);
      }

      onKeyLift = () => {
        invariant(this.state.ref, 'cannot move an item that is not in the DOM');

        const {
          mapProps: { id, isDragEnabled },
          dispatchProps: { lift },
        } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.ref);

        // using center position as selection
        lift(id, type, center, scroll, center);
      }

      onMove = (point: Position) => {
        invariant(this.state.ref, 'cannot move when there is no ref');

        const {
          mapProps: { id, isDragEnabled, initial },
          dispatchProps: { move },
        } = this.props;

        if (isDragEnabled === false) {
          throw new Error('need to cancel the current drag');
        }

        // dimensions not provided yet
        if (!initial) {
          return;
        }

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

        const offset: Position = {
          x: mouseDiff.x + scrollDiff.x,
          y: mouseDiff.y + scrollDiff.y,
        };
        const center: Position = {
          x: initial.center.x + offset.x,
          y: initial.center.y + offset.y,
        };

        move(id, offset, center);
      }

      onMoveForward = () => {
        const {
          mapProps: { id },
          dispatchProps: { moveForward },
        } = this.props;

        moveForward(id);
      }

      onMoveBackward = () => {
        const {
          mapProps: { id },
          dispatchProps: { moveBackward },
         } = this.props;

        moveBackward(id);
      }

      onDrop = () => {
        const {
          mapProps: { id },
          dispatchProps: { drop },
         } = this.props;

        drop(id);
      }

      onCancel = () => {
        const {
          mapProps: { id },
          dispatchProps: { cancel },
         } = this.props;

        cancel(id);
      }

      setRef = (ref: ?Element) => {
        // need to trigger a child render when ref changes
        this.setState({
          ref,
        });
      }

      setChildRef = (el: ?Element) => {
        this.setState({
          childRef: el,
        });
      }

      getPlaceholder() {
        invariant(this.props.mapProps.initial, 'cannot get a drag placeholder when not dragging');
        const dimension = this.props.mapProps.initial.dimension;
        const style = {
          width: dimension.width,
          height: dimension.height,
          backgroundColor: 'pink',
        };

        return (
          <div style={style} />
        );
      }

      render() {
        const { mapProps, ownProps } = this.props;

        console.log('rendering draggable', mapProps.id);

        const movement: Movement = getMovement(
          mapProps.isDragging,
          this.state.wasDragging,
          mapProps.canAnimate
        );

        const handle = this.getHandle(mapProps.isDragEnabled);

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return handle;
        };

        const snapshot: DraggableState = {
          isDragging: mapProps.isDragging,
        };

        const additionalProps = map(snapshot, ownProps, requestDragHandle);

        const enhancedOwnProps = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not request then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : handle;

        const isMoving = mapProps.isDragging || this.state.wasDragging;

        const moveableStyle = (() => {
          if (!isMoving) {
            return {};
          }
          const dimension = mapProps.initial.dimension;
          return {
            position: 'absolute',
            width: dimension.width,
            height: dimension.height,
            top: dimension.top,
            left: dimension.left,
            //TODO: Cursor..
          };
        })();

        // TODO: remove `Container` and pass cursor style to `Moveable`
        return (
          <div>
            <Moveable
              speed={movement.speed}
              zIndex={movement.zIndex}
              destination={mapProps.offset}
              onMoveEnd={this.onMoveEnd}
              innerRef={this.setRef}
              style={moveableStyle}
            >
              {wrap(
                <DraggableDimensionPublisher
                  itemId={mapProps.id}
                  type={type}
                  targetRef={this.state.childRef}
                >
                  <Container thisShouldBeRemovedAndStyleDoneElsewhere>
                    <Component {...enhancedOwnProps} innerRef={this.setChildRef} />
                  </Container>
                </DraggableDimensionPublisher>
              )}
            </Moveable>
            {isMoving ? this.getPlaceholder() : null}
          </div>
        );
      }
    };
