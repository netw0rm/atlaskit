// @flow
import React, { PureComponent } from 'react';
import invariant from 'invariant';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import type { State, CurrentDrag, Position, DraggableId, Dimension, DimensionMap } from '../../types';
import { currentDragSelector, draggableDimensionsSelector } from '../../state/selectors';
import getScrollPosition from '../get-scroll-position';
import isVisible from '../is-visible';
import storeKey from '../../state/get-store-key';

type ConnectedProps = {|
  itemId: DraggableId,
|}

type MapProps = {|
  dimension: ?Dimension,
  currentDrag: ?CurrentDrag,
|}

type Props = {
  children?: React$Element<any>,
} & ConnectedProps & MapProps;

const scrollBy = 2.5;

class ScrollTo extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */

  componentDidUpdate(prevProps: Props) {
    const { dimension, currentDrag } = this.props;
    if (!dimension || !currentDrag) {
      return;
    }

    const initialScroll: Position = currentDrag.dragging.initial.scroll;
    const offset: Position = currentDrag.dragging.offset;

    if (isVisible(dimension, offset, initialScroll)) {
      return;
    }

    const isMovingForward = ((): boolean => {
      // first movement
      if (prevProps.currentDrag == null) {
        return currentDrag.impact.movement.isMovingForward;
      }

      // subsequent movements
      // might be moving a backwards after moving forwards,
      // but not past the start point
      return offset.y - prevProps.currentDrag.dragging.offset.y > 1;
    })();


    console.log('not visible:', this.props.itemId, 'is moving forward', isMovingForward);

    const newY = window.pageYOffset + (dimension.height * scrollBy * (isMovingForward ? 1 : -1))
    requestAnimationFrame(() => {
      window.scroll(0, newY);
    })
  }

  render() {
    return this.props.children;
  }
}

const idSelector = (state: State, props: ConnectedProps): DraggableId => props.itemId;

const dimensionSelector = createSelector(
  [draggableDimensionsSelector, idSelector],
  (dimensions: ?DimensionMap, id: DraggableId): ?Dimension => {
    if (!dimensions) {
      return null;
    }
    return dimensions[id];
  }
)

const empty: MapProps = {
  dimension: null,
  currentDrag: null,
}

const makeResultSelector = () => createSelector(
  [dimensionSelector, currentDragSelector, idSelector],
  (dimension: ?Dimension, currentDrag: ?CurrentDrag, id: DraggableId): MapProps => {
    if (!currentDrag ||
      !currentDrag.dragging ||
      currentDrag.dragging.id !== id ||
      !currentDrag.dragging.shouldAnimate) {
      return empty;
    }

    return {
      dimension,
      currentDrag,
    }
  }
);

const makeMapStateToProps = () => {
  const resultSelector = makeResultSelector();
  const mapStateToProps = (state: State, props: ConnectedProps): MapProps =>
    resultSelector(state, props);
  return mapStateToProps;
}

export default connect(makeMapStateToProps, null, null, { storeKey })(ScrollTo)

