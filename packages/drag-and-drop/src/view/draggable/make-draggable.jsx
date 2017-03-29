// @flow
import React, { PureComponent } from 'react';
import invariant from 'invariant';
import styled from 'styled-components';
import type { TypeId, Position, ZIndex } from '../../types';
import type { Props, MapState, StateSnapshot } from './draggable-types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import type { Speed } from '../moveable';
import createDragHandle from '../drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import getDisplayName from '../get-display-name';

const identity = x => x;
const origin: Position = { x: 0, y: 0 };
const empty = {};

type ComponentState = {|
  childRef: ?Element,
|}

type MovementStyle = {|
  position: 'absolute',
  zIndex: ZIndex,
  width: number,
  height: number,
  top: number,
  left: number,
|}

type PlacementInfo = {|
  showPlaceholder: boolean,
  speed: Speed,
  style ?: MovementStyle
|}

export const Placeholder = styled.div``;

export default (type: TypeId, map: MapState): Function =>
  (Component: ReactClass<any>): ReactClass<any> =>
    class Draggable extends PureComponent {
      /* eslint-disable react/sort-comp */
      props: Props
      state: ComponentState
      getHandle: Function

      state: ComponentState = {
        childRef: null,
      }

      static displayName = `Draggable(${getDisplayName(Component)})`

      static defaultProps = {
        offset: origin,
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

      onMoveEnd = () => {
        if (!this.props.mapProps.isDropAnimating) {
          return;
        }

        const {
          mapProps: { id },
          dispatchProps: { dropAnimationFinished },
        } = this.props;

        dropAnimationFinished(id);
      }

      onLift = (selection: Position) => {
        invariant(this.state.childRef, 'cannot move an item that is not in the DOM');

        const {
          mapProps: { id, isDragEnabled },
          dispatchProps: { lift },
        } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.childRef);

        lift(id, type, center, scroll, selection);
      }

      onKeyLift = () => {
        invariant(this.state.childRef, 'cannot move an item that is not in the DOM');

        const {
          mapProps: { id, isDragEnabled },
          dispatchProps: { lift },
        } = this.props;

        if (isDragEnabled === false) {
          return;
        }

        const scroll: Position = getScrollPosition();
        const center: Position = getCenterPosition(this.state.childRef);

        // using center position as selection
        lift(id, type, center, scroll, center);
      }

      onMove = (point: Position) => {
        const {
          mapProps: { id, isDragEnabled, initial },
          dispatchProps: { move },
        } = this.props;

        invariant(this.state.childRef, 'cannot move when there is no ref');
        // This should already be handled gracefully in DragHandle.
        // Just being extra clear here
        invariant(isDragEnabled, 'cannot move when dragging is disabled');

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
          <Placeholder style={style} />
        );
      }

      getPlacementInfo(): PlacementInfo {
        const { isDragging, canAnimate, initial, isDropAnimating } = this.props.mapProps;

        const getMovingStyle = (zIndex: ZIndex): MovementStyle => {
          invariant(initial, 'initial dimension required to drag');
          return {
            zIndex,
            position: 'absolute',
            width: initial.dimension.width,
            height: initial.dimension.height,
            top: initial.dimension.top,
            left: initial.dimension.left,
          };
        };

        if (isDragging) {
          return {
            showPlaceholder: true,
            speed: canAnimate ? 'FAST' : 'INSTANT',
            style: getMovingStyle(100),
          };
        }

        if (!canAnimate) {
          return {
            showPlaceholder: false,
            speed: 'INSTANT',
          };
        }

        if (isDropAnimating) {
          return {
            showPlaceholder: true,
            speed: 'STANDARD',
            style: getMovingStyle(50),
          };
        }

        // Default: can move quickly.
        // Can move out of the way when other draggables are dragging
        return {
          showPlaceholder: false,
          speed: 'FAST',
        };
      }

      render() {
        const { mapProps, ownProps } = this.props;

        const info: PlacementInfo = this.getPlacementInfo();
        const handle = this.getHandle(mapProps.isDragEnabled);

        const requestDragHandle = () => {
          requestDragHandle.wasCalled = true;
          return handle;
        };

        const snapshot: StateSnapshot = {
          isDragging: mapProps.isDragging,
        };

        const additionalProps = map(snapshot, ownProps, requestDragHandle);

        const enhancedOwnProps = {
          ...ownProps,
          ...additionalProps,
        };

        // if a drag handle was not requested then the whole thing is the handle
        const wrap = requestDragHandle.wasCalled ? identity : handle;

        return (
          <div>
            <Moveable
              speed={info.speed}
              style={info.style ? info.style : empty}
              extraCSS="user-select: none;"
              destination={mapProps.offset}
              onMoveEnd={this.onMoveEnd}
            >
              <DraggableDimensionPublisher
                itemId={mapProps.id}
                type={type}
                targetRef={this.state.childRef}
              >
                {wrap(
                  <Component {...enhancedOwnProps} innerRef={this.setChildRef} />
                )}
              </DraggableDimensionPublisher>
            </Moveable>
            {info.showPlaceholder ? this.getPlaceholder() : null}
          </div>
        );
      }
    };
