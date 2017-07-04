// @flow
import { PureComponent } from 'react';
import invariant from 'invariant';
import getScrollPosition from '../get-scroll-position';
import type { Dimension, DimensionFragment, Position } from '../../types';
import type { Props } from './dimension-publisher-types';

export default class DimensionPublisher extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */
  getDimension = (): Dimension => {
    const { itemId, targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot calculate a dimension when not attached to the DOM');

    // getBoundingClientRect returns values relative to the current viewport
    // It does not consider the distance from the top of the document
    // https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
    // https://stackoverflow.com/a/27129257/1374236
    const { top, right, bottom, left, width, height } = targetRef.getBoundingClientRect();
    const style = window.getComputedStyle(targetRef);
    const scroll: Position = getScrollPosition();

    const marginTop = parseInt(style.marginTop, 10);
    const marginRight = parseInt(style.marginRight, 10);
    const marginBottom = parseInt(style.marginBottom, 10);
    const marginLeft = parseInt(style.marginLeft, 10);

    const withScroll = {
      top: top + scroll.y,
      right: right + scroll.x,
      left: left + scroll.x,
      bottom: bottom + scroll.y,
    };

    const withoutMargin: DimensionFragment = {
      top: withScroll.top,
      right: withScroll.right,
      left: withScroll.left,
      bottom: withScroll.bottom,
      width,
      height,
    };
    const withMargin: DimensionFragment = {
      top: (withScroll.top + marginTop),
      right: (withScroll.right + marginRight),
      left: (withScroll.left + marginLeft),
      bottom: (withScroll.bottom + marginBottom),
      width: width + marginLeft + marginRight,
      height: height + marginBottom + marginTop,
    };

    const dimension: Dimension = {
      id: itemId,
      withoutMargin,
      withMargin,
      // Not considering margins when calculating the center position
      center: {
        x: (withScroll.left + withScroll.right) / 2,
        y: (withScroll.top + withScroll.bottom) / 2,
      },
    };

    return dimension;
  }

  // TODO: componentDidUpdate?
  componentWillReceiveProps(nextProps: Props) {
    // Because the dimension publisher wraps children - it might render even when its props do
    // not change. We need to ensure that it does not publish when it should not.

    if (!this.props.shouldPublish && nextProps.shouldPublish) {
      this.props.publish(this.getDimension());
    }
  }

  render() {
    return this.props.children;
  }
}
