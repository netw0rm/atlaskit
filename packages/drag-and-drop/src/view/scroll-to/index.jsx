// @flow
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import type { State, CurrentDrag, Position, DraggableId, Dimension, DimensionMap } from '../../types';
import { currentDragSelector, draggableDimensionsSelector } from '../../state/selectors';
import getScrollPosition from '../get-scroll-position';
import getVisibilityOffset from '../is-visible';
import storeKey from '../../state/get-store-key';

const isEmpty = (point: Position): boolean =>
  point.x === 0 && point.y === 0;

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

const additionalScrollMultiplier = 2;

class KeepVisible extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */

  componentDidUpdate() {
    const { dimension, currentDrag } = this.props;
    if (!dimension || !currentDrag) {
      return;
    }

    const initialScroll: Position = currentDrag.dragging.initial.scroll;
    const offset: Position = currentDrag.dragging.offset;

    const visibilityOffset: Position = getVisibilityOffset(dimension, offset, initialScroll);

    if (isEmpty(visibilityOffset)) {
      return;
    }

    const scroll = getScrollPosition();

    const toBeVisible = visibilityOffset.y + scroll.y;
    const additionalBuffer = dimension.height * additionalScrollMultiplier *
      (visibilityOffset.y > 0 ? 1 : -1);
    const newY = toBeVisible + additionalBuffer;
    requestAnimationFrame(() => {
      window.scroll(0, newY);
    });
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
);

const empty: MapProps = {
  dimension: null,
  currentDrag: null,
};

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
    };
  }
);

const makeMapStateToProps = () => {
  const resultSelector = makeResultSelector();
  const mapStateToProps = (state: State, props: ConnectedProps): MapProps =>
    resultSelector(state, props);
  return mapStateToProps;
};

export default connect(makeMapStateToProps, null, null, { storeKey })(KeepVisible);

