// @flow
import type {Position, Dimension } from '../types';
import getScrollPosition from './get-scroll-position';

const noWhere: Position = {
  x: 0,
  y: 0,
}

export default (dimension: Dimension,
  offset?: Position = noWhere,
  initialScroll?: Position = noWhere): Position => {
  const node = {
    top: (dimension.top + offset.y + initialScroll.y),
    bottom: (dimension.bottom + offset.y + initialScroll.y),
    left: (dimension.left + offset.x + initialScroll.x),
    right: (dimension.right + offset.x + initialScroll.x),
  }

  const viewport = {
    top: window.pageYOffset,
    bottom: window.innerHeight + window.pageYOffset,
    left: window.pageXOffset,
    right: window.innerWidth + window.pageXOffset
  }

  // how invisible?


  const isVisible = node.top > viewport.top &&
    node.bottom < viewport.bottom &&
    node.left > viewport.left &&
    node.right < viewport.right;

  if (isVisible) {
    return noWhere;
  }

  const y = (() => {
    // node is above the viewport
    if (node.top < viewport.top) {
      // negative value
      return node.top - viewport.top;
    }

    // node is below the viewport
    if (node.bottom > viewport.bottom) {
      return node.bottom - viewport.bottom;
    }

    return 0;
  })()

  return {
    x: 0,
    y
  }
}
