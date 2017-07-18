// @flow
import { Component } from 'react';
import invariant from 'invariant';
import memoizeOne from 'memoize-one';
import rafScheduler from 'raf-schd';
import getWindowScrollPosition from '../get-window-scroll-position';
import { getDroppableDimension } from '../../state/dimension';
// eslint-disable-next-line no-duplicate-imports
import type { Margin } from '../../state/dimension';
import type { DroppableDimension, Position, HTMLElement } from '../../types';
import type { Props } from './droppable-dimension-publisher-types';

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

export default class DroppableDimensionPublisher extends Component {
  /* eslint-disable react/sort-comp */
  props: Props;

  isWatchingScroll: boolean = false;

  // Assuming that the scroll parent cannot change.
  // Otherwise can remove the memoizeOne
  memoizedScrollParent = memoizeOne((ref: HTMLElement) => getScrollParent(ref));

  getScrollOffset = (): Position => {
    const { targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot calculate a dimension when not attached to the DOM');

    const parent: HTMLElement = this.memoizedScrollParent(targetRef);
    const offset: Position = {
      x: parent.scrollLeft,
      y: parent.scrollTop,
    };
    return offset;
  }

  getDimension = (): DroppableDimension => {
    const { droppableId, targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot calculate a dimension when not attached to the DOM');

    const style = window.getComputedStyle(targetRef);

    const margin: Margin = {
      top: parseInt(style.marginTop, 10),
      right: parseInt(style.marginRight, 10),
      bottom: parseInt(style.marginBottom, 10),
      left: parseInt(style.marginLeft, 10),
    };

    const dimension: DroppableDimension = getDroppableDimension(
      droppableId,
      targetRef.getBoundingClientRect(),
      margin,
      getWindowScrollPosition(),
      this.getScrollOffset(),
    );

    return dimension;
  }

  scheduleScrollUpdate = rafScheduler(
    (offset: Position) => this.props.updateScroll(this.props.droppableId, offset)
  );

  onScroll = () => {
    this.scheduleScrollUpdate(this.getScrollOffset());
  }

  watchScroll = () => {
    if (this.isWatchingScroll) {
      return;
    }

    const { targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot watch the scroll of an element that is not attached to the DOM');

    targetRef.addEventListener('scroll', this.onScroll, { passive: true });
    this.isWatchingScroll = true;
  }

  unwatchScroll = () => {
    if (!this.isWatchingScroll) {
      return;
    }

    const { targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot unwatch the scroll of an element that is not attached to the DOM');

    targetRef.removeEventListener('scroll', this.onScroll);
    this.isWatchingScroll = false;
  }

  // TODO: componentDidUpdate?
  componentWillReceiveProps(nextProps: Props) {
    // Because the dimension publisher wraps children - it might render even when its props do
    // not change. We need to ensure that it does not publish when it should not.
    const shouldPublish = !this.props.shouldPublish && nextProps.shouldPublish;

    if (!shouldPublish) {
      this.unwatchScroll();
      return;
    }

    this.props.publish(this.getDimension());
    this.watchScroll();
  }

  render() {
    return this.props.children;
  }
}
