// @flow
import type {Position, Dimension } from '../types';
import getScrollPosition from './get-scroll-position';

const noWhere: Position = {
  x: 0,
  y: 0,
}

export default (dimension: Dimension,
  offset?: Position = noWhere,
  initialScroll?: Position = noWhere): boolean => {
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

  return node.top > viewport.top &&
    node.bottom < viewport.bottom &&
    node.left > viewport.left &&
    node.right < viewport.right;
}
