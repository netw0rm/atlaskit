// @flow
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { ConnectedProps, MapProps } from './keep-visible-types';
import type { State, Position } from '../../types';
import makeSelector from './make-keep-visible-selector';

import getScrollPosition from '../get-scroll-position';
import getVisibilityOffset from '../is-visible';
import storeKey from '../../state/get-store-key';

const isEmpty = (point: Position): boolean =>
  point.x === 0 && point.y === 0;

type Props = {
  children?: React$Element<any>,
} & ConnectedProps & MapProps;

const additionalScrollMultiplier = 2;

export class KeepVisible extends PureComponent {
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

const makeMapStateToProps = () => {
  const resultSelector = makeSelector();
  const mapStateToProps = (state: State, props: ConnectedProps): MapProps =>
    resultSelector(state, props);
  return mapStateToProps;
};

export default connect(makeMapStateToProps, null, null, { storeKey })(KeepVisible);

