// @flow
import { Component } from 'react';
import invariant from 'invariant';
import getWindowScrollPosition from '../get-window-scroll-position';
import getDimension from '../../state/get-dimension';
// eslint-disable-next-line no-duplicate-imports
import type { Margin } from '../../state/get-dimension';
import type { Dimension, Position, HTMLElement } from '../../types';
import type { Props } from './dimension-publisher-types';

const getScrollParent = (el: ?HTMLElement) => {
  // cannot do anything else!
  if (el == null) {
    return document.body;
  }

  if (el.scrollHeight === el.clientHeight) {
    return getScrollParent(el.parentElement);
  }

  // success!
  return el;
};

export default class DimensionPublisher extends Component {
  /* eslint-disable react/sort-comp */
  props: Props

  getScrollOffset = (): Position => {
    const { targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot calculate a dimension when not attached to the DOM');

    const parent: HTMLElement = getScrollParent(targetRef);
    const offset: Position = {
      x: -parent.scrollLeft,
      y: -parent.scrollTop,
    };
    return offset;
  }

  getDimension = (): Dimension => {
    const { itemId, targetRef, parentId } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot calculate a dimension when not attached to the DOM');

    const style = window.getComputedStyle(targetRef);

    const margin: Margin = {
      top: parseInt(style.marginTop, 10),
      right: parseInt(style.marginRight, 10),
      bottom: parseInt(style.marginBottom, 10),
      left: parseInt(style.marginLeft, 10),
    };

    return getDimension(
      itemId,
      parentId,
      targetRef.getBoundingClientRect(),
      margin,
      getWindowScrollPosition(),
      this.getScrollOffset(),
    );
  }
  /* eslint-enable react/sort-comp */

  // TODO: componentDidUpdate?
  componentWillReceiveProps(nextProps: Props) {
    // Because the dimension publisher wraps children - it might render even when its props do
    // not change. We need to ensure that it does not publish when it should not.
    const shouldPublish = !this.props.shouldPublish && nextProps.shouldPublish;

    if (!shouldPublish) {
      return;
    }

    const { isScrollAware } = nextProps;

    // publish the initial dimension
    this.props.publish(this.getDimension(isScrollAware));

    if (isScrollAware) {
      this.watchScroll();
    }
  }

  render() {
    return this.props.children;
  }
}
