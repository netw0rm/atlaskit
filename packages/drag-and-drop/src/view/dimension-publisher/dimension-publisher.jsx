// @flow
import { PureComponent } from 'react';
import invariant from 'invariant';
import type { Dimension } from '../../types';
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

    const dimension: Dimension = {
      id: itemId,
      top: (top + marginTop),
      right: (right + marginRight),
      left: (left + marginLeft),
      bottom: (bottom + marginBottom),
      width: width + marginLeft + marginRight,
      height: height + marginBottom + marginTop,
      // Not considering margins when calculating the center position
      center: {
        x: (left + right) / 2,
        y: (top + bottom) / 2,
      },
    };

    return dimension;
  }

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
