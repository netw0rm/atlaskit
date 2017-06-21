// @flow
import { PureComponent } from 'react';
import invariant from 'invariant';
import type { Dimension, DimensionFragment } from '../../types';
import type { Props } from './dimension-publisher-types';

export default class DimensionPublisher extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */
  getDimension = (): Dimension => {
    const { itemId, targetRef } = this.props;
    invariant(targetRef, 'cannot get dimensions when not attached');

    const { top, right, bottom, left, width, height } = targetRef.getBoundingClientRect();
    const style = window.getComputedStyle(targetRef);

    const marginTop = parseInt(style.marginTop, 10);
    const marginRight = parseInt(style.marginRight, 10);
    const marginBottom = parseInt(style.marginBottom, 10);
    const marginLeft = parseInt(style.marginLeft, 10);

    const withoutMargin: DimensionFragment = {
      top,
      right,
      left,
      bottom,
      width,
      height,
    };
    const withMargin: DimensionFragment = {
      top: (top + marginTop),
      right: (right + marginRight),
      left: (left + marginLeft),
      bottom: (bottom + marginBottom),
      width: width + marginLeft + marginRight,
      height: height + marginBottom + marginTop,
    };

    const dimension: Dimension = {
      id: itemId,
      withoutMargin,
      withMargin,
      // Not considering margins when calculating the center position
      center: {
        x: (left + right) / 2,
        y: (top + bottom) / 2,
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
