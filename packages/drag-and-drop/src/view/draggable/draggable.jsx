// @flow
import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import invariant from 'invariant';
import type { Position, ZIndex, InitialDrag } from '../../types';
import { DraggableDimensionPublisher } from '../dimension-publisher/';
import Moveable from '../moveable/';
import DragHandle from '../drag-handle/drag-handle';
import getCenterPosition from '../get-center-position';
import getScrollPosition from '../get-scroll-position';
import Placeholder from './placeholder';
import type { DragHandleCallbacks, DragHandleProvided } from '../drag-handle/drag-handle';
import type { Props, Provided } from './draggable-types';
import type { Speed } from '../moveable';

type PlacementStyle = {|
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: ZIndex,
  width: number,
  height: number,
  top: number,
  left: number,
|}

type PlacementInfo = {|
  showPlaceholder: boolean,
  speed: Speed,
  style?: PlacementStyle
|}

type State = {|
  childRef: ?Element,
|}

export default class Draggable extends PureComponent {
  props: Props
  state: State
  callbacks: DragHandleCallbacks

  state: State = {
    childRef: null,
  }

  static defaultProps = {
    isDragEnabled: true,
    type: 'DEFAULT',
  }

  constructor(props: Props, context: mixed) {
    super(props, context);

    this.callbacks = {
      onLift: this.onLift,
      onMove: this.onMove,
      onDrop: this.onDrop,
      onCancel: this.onCancel,
      onKeyLift: this.onKeyLift,
      onMoveBackward: this.onMoveBackward,
      onMoveForward: this.onMoveForward,
    };
  }

  // This should already be handled gracefully in DragHandle.
  // Just being extra clear here
  throwIfCannotDrag() {
    invariant(this.state.childRef,
      'Draggable: cannot drag if not attached child node'
    );
    invariant(this.props.isDragEnabled,
      'Draggable: cannot drag dragging is not enabled'
    );
  }

  onMoveEnd = () => {
    if (!this.props.isDropAnimating) {
      return;
    }

    this.props.dropAnimationFinished(this.props.draggableId);
  }

  onLift = (selection: Position) => {
    this.throwIfCannotDrag();
    const { lift, draggableId, type } = this.props;

    const scroll: Position = getScrollPosition();
    const center: Position = getCenterPosition(this.state.childRef);

    lift(draggableId, type, center, scroll, selection);
  }

  onKeyLift = () => {
    this.throwIfCannotDrag();
    const { lift, draggableId, type } = this.props;

    const scroll: Position = getScrollPosition();
    const center: Position = getCenterPosition(this.state.childRef);

    // using center position as selection
    lift(draggableId, type, center, scroll, center);
  }

  onMove = (point: Position) => {
    this.throwIfCannotDrag();

    const { draggableId, initial, move } = this.props;

    console.log('on move', initial);

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

    move(draggableId, offset, center);
  }

  onMoveForward = () => {
    this.throwIfCannotDrag();
    this.props.moveForward(this.props.draggableId);
  }

  onMoveBackward = () => {
    this.throwIfCannotDrag();
    this.props.moveBackward(this.props.draggableId);
  }

  onDrop = () => {
    this.throwIfCannotDrag();
    this.props.drop(this.props.draggableId);
  }

  onCancel = () => {
    // Not checking if drag is enabled.
    // Cancel is an escape mechanism
    this.props.cancel(this.props.draggableId);
  }

  setChildRef = (el: ?Element) => {
    this.setState({
      childRef: el,
    });
  }

  getPlaceholder() {
    invariant(this.props.initial, 'cannot get a drag placeholder when not dragging');
    const dimension = this.props.initial.dimension;

    return (
      <Placeholder
        height={dimension.withMargin.height}
        width={dimension.withMargin.width}
      />
    );
  }

  getMovingStyle = memoizeOne((initial: ?InitialDrag, zIndex: ZIndex): PlacementStyle => {
    invariant(initial, 'initial dimension required to drag');
    return {
      zIndex,
      position: 'absolute',
      boxSizing: 'border-box',
      // when we use position absolute we need to
      // force the height and width because it looses
      // its standard positioning logic
      width: initial.dimension.withoutMargin.width,
      height: initial.dimension.withoutMargin.height,
      top: initial.dimension.withoutMargin.top,
      left: initial.dimension.withoutMargin.left,
    };
  });

  getPlacementInfo(): PlacementInfo {
    const { isDragging, canAnimate, initial, isDropAnimating } = this.props;

    if (isDragging) {
      return {
        showPlaceholder: true,
        speed: canAnimate ? 'FAST' : 'INSTANT',
        style: this.getMovingStyle(initial, 100),
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
        style: this.getMovingStyle(initial, 50),
      };
    }

    // Default: can move quickly.
    // Can move out of the way when other draggables are dragging
    return {
      showPlaceholder: false,
      speed: 'FAST',
    };
  }

  getProvided = memoizeOne((
    isDragging: boolean,
    showPlaceholder: boolean,
    dragHandleProps: DragHandleProvided,
    movementStyle: Object,
    placementStyle: ?PlacementStyle,
  ): Provided => ({
    innerRef: this.setChildRef,
    placeholder: showPlaceholder ? this.getPlaceholder() : null,
    isDragging,
    dragHandleProps,
    containerStyle: {
      ...placementStyle,
      ...movementStyle,
    },
  }))

  memoizedChildrenFn = memoizeOne(
    (provided: Provided) => this.props.children(provided)
  );

  render() {
    const info: PlacementInfo = this.getPlacementInfo();

    return (
      <DraggableDimensionPublisher
        itemId={this.props.draggableId}
        type={this.props.type}
        targetRef={this.state.childRef}
      >
        <Moveable
          speed={info.speed}
          destination={this.props.offset}
          onMoveEnd={this.onMoveEnd}
        >
          {movementStyle => (
            <DragHandle
              isEnabled={this.props.isDragEnabled}
              callbacks={this.callbacks}
            >
              {(dragHandleProps: DragHandleProvided) =>
                this.memoizedChildrenFn(this.getProvided(
                  this.props.isDragging,
                  info.showPlaceholder,
                  dragHandleProps,
                  movementStyle,
                  info.style,
                ))}
            </DragHandle>
        )}
        </Moveable>
      </DraggableDimensionPublisher>
    );
  }
}
