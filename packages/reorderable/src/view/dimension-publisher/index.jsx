// @flow
import { cloneElement, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import invariant from 'invariant';
import {
  publishDraggableDimension,
  publishDroppableDimension,
} from '../../state/action-creators';
import type { Dimension, Position } from '../../state/types';

export class DimensionPublisher extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: {|
    itemId: Id,
    // needs to always be a styled component
    // todo: add check
    children: React$Element<any>,
    shouldPublish: boolean,
    publish: Function,
  |}
/* eslint-enable */
  getDimension = (): Dimension => {
    invariant(this.ref, 'cannot get dimensions when not attached');

    const { top, right, bottom, left, width, height } = this.ref.getBoundingClientRect();

    const style = window.getComputedStyle(this.ref);
    const marginTop = parseInt(style.marginTop, 10);
    const marginRight = parseInt(style.marginRight, 10);
    const marginBottom = parseInt(style.marginBottom, 10);
    const marginLeft = parseInt(style.marginLeft, 10);

    const topWithMargin = top + marginTop;
    const rightWithMargin = right + marginRight;
    const leftWithMargin = left + marginLeft;
    const bottomWithMargin = bottom + marginBottom;

  // custom properties
    const centerX = (leftWithMargin + rightWithMargin) / 2;
    const centerY = (topWithMargin + bottomWithMargin) / 2;
    const center: Position = { x: centerX, y: centerY };

    const dimension: Dimension = {
      id: this.props.itemId,
      top: topWithMargin,
      right: rightWithMargin,
      bottom: bottomWithMargin,
      left: leftWithMargin,
      width: width + marginLeft + marginRight,
      height: height + marginTop + marginBottom,
      center,
    };

    return dimension;
  }

  componentWillReceiveProps(nextProps) {
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
    return cloneElement(this.props.children, {
      innerRef: this.setRef,
    });
  }
}

const mapStateToProps = (state: State, ownProps: Object) => {
  console.log('mapping dimension-publisher props');
  const isDragging: boolean = !!state.currentDrag;

  if (!isDragging) {
    return {
      shouldPublish: false,
    };
  }

  const type: TypeId = state.currentDrag.dragging.type;

  if (type !== ownProps.type) {
    return {
      shouldPublish: false,
    };
  }

  return {
    shouldPublish: true,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const publish = (ownProps.dimensionType === 'DRAGGABLE' ? publishDraggableDimension : publishDroppableDimension);

  return bindActionCreators({
    publish,
  }, (dispatch));
};

// TODO: type prop type for connect
export default connect(mapStateToProps, mapDispatchToProps, null, { storeKey: 'dragDropStore' })(DimensionPublisher);
