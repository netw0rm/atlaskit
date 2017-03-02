// @flow
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import {
  publishDraggableDimension,
  publishDroppableDimension,
} from '../../state/action-creators';
import type { Id, TypeId, Dimension, Position, State } from '../../types';
import storeKey from '../../state/get-store-key';

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
    width: width + marginLeft,
    height: height + marginRight,
  };
};

type Props = {|
    itemId: Id,
    // needs to always be a styled component
    // todo: add check
    children?: React$Element<any>,
    shouldPublish: boolean,
    publish: Function,
    outerRef?: ?Element
|}

export class DimensionPublisher extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props

  ref: ?Element
/* eslint-enable */
  getDimension = (): Dimension => {
    const ref = this.props.outerRef;
    invariant(ref, 'cannot get dimensions when not attached');

    const { top, right, bottom, left, width, height } = getBounds(ref);

    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const center: Position = { x: centerX, y: centerY };

    const dimension: Dimension = {
      id: this.props.itemId,
      top,
      right,
      bottom,
      left,
      width,
      height,
      center,
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

    this.props.publish(this.getDimension());
  }

  setRef = (ref: ?any) => {
    this.ref = ref;
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state: State, ownProps: Object) => {
  if (!state.requestDimensions) {
    return {
      shouldPublish: false,
    };
  }

  const type: TypeId = state.requestDimensions;

  if (type !== ownProps.type) {
    return {
      shouldPublish: false,
    };
  }

  return {
    shouldPublish: true,
  };
};

export const DraggableDimensionPublisher = (() => {
  const mapDispatchToProps = {
    publish: publishDraggableDimension,
  };

  return connect(mapStateToProps, mapDispatchToProps, null, { storeKey })(DimensionPublisher);
})();

export const DroppableDimensionPublisher = (() => {
  const mapDispatchToProps = {
    publish: publishDroppableDimension,
  };

  return connect(mapStateToProps, mapDispatchToProps, null, { storeKey })(DimensionPublisher);
})();
