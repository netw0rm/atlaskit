// @flow
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import type { Dimension, Position, Action } from '../../types';
import type { Props, DispatchProps } from './dimension-publisher-types';
import storeKey from '../../state/get-store-key';
import makeSelector from './make-dimension-publisher-selector';

const getBounds = (ref: Element) => {
  const { top, right, bottom, left, width, height } = ref.getBoundingClientRect();
  const style = window.getComputedStyle(ref);

  const marginTop = parseInt(style.marginTop, 10);
  const marginRight = parseInt(style.marginRight, 10);
  const marginBottom = parseInt(style.marginBottom, 10);
  const marginLeft = parseInt(style.marginLeft, 10);

  return {
    top: (top + marginTop),
    right: (right + marginRight),
    left: (left + marginLeft),
    bottom: (bottom + marginBottom),
    width: width + marginLeft + marginRight,
    height: height + marginBottom + marginTop,
  };
};

export class DimensionPublisher extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */

  getDimension = (): Dimension => {
    const ref = this.props.targetRef;
    invariant(ref, 'cannot get dimensions when not attached');

    const { top, right, bottom, left, width, height } = getBounds(ref);

    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const center: Position = { x: centerX, y: centerY };

    const dimension: Dimension = {
      id: this.props.itemId,
      droppableId: this.props.droppableId,
      top,
      right,
      bottom,
      left,
      width,
      height,
      center,
      scrollTop: ref.scrollTop,
      scrollHeight: ref.scrollHeight,
    };

    return dimension;
  }

  componentWillReceiveProps(nextProps: Props) {
    // no request - publish not needed
    if (!nextProps.shouldPublish) {
      return;
    }

    // no change - publish not needed
    if (this.props.shouldPublish === nextProps.shouldPublish) {
      return;
    }

    // TODO:
    // - get ref of child similar to draggable
    // - use MutationObserver rather than interval
    // - make this chore its own component

    this.props.publish(this.getDimension());
  }

  render() {
    return this.props.children;
  }
}

const makeMapStateToProps = () => makeSelector();

export default (publish: Action) => {
  const mapDispatchToProps: DispatchProps = {
    publish,
  };
  return connect(makeMapStateToProps, mapDispatchToProps, null, { storeKey })(DimensionPublisher);
};
