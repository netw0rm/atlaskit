// @flow
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import {
  publishDraggableDimension,
  publishDroppableDimension,
} from '../../state/action-creators';
import getOffset from '../get-offset';
import type { Id, TypeId } from '../../types';
import type { Dimension, Position, State } from '../../state/types';

const getBounds = (ref: Element) => {
  const { top, right, bottom, left, width, height } = ref.getBoundingClientRect();
  const offset: Position = getOffset(ref);
  const style = window.getComputedStyle(ref);

  const marginTop = parseInt(style.marginTop, 10);
  const marginRight = parseInt(style.marginRight, 10);
  const marginBottom = parseInt(style.marginBottom, 10);
  const marginLeft = parseInt(style.marginLeft, 10);

  return {
    top: (top + marginTop) - offset.y,
    right: (right + marginRight) - offset.x,
    left: (left + marginLeft) - offset.x,
    bottom: (bottom + marginBottom) - offset.y,
    width: width + marginLeft + marginRight,
    height: height + marginRight + marginLeft,
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

  return connect(mapStateToProps, mapDispatchToProps, null, { storeKey: 'dragDropStore' })(DimensionPublisher);
})();

export const DroppableDimensionPublisher = (() => {
  const mapDispatchToProps = {
    publish: publishDroppableDimension,
  };

  return connect(mapStateToProps, mapDispatchToProps, null, { storeKey: 'dragDropStore' })(DimensionPublisher);
})();
