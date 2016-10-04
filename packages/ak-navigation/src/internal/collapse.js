import {
  globalCollapsedWidth,
  containerCollapsedWidth,
  expandedWidth,
  containerPaddingExpanded,
} from '../shared-variables.js';

import { breakpoints } from './resizer';

const intermediateWidth = globalCollapsedWidth + containerCollapsedWidth;
const collapsedWidth = globalCollapsedWidth;

const containerPaddingCollapsed = 10;
// start collapsing the padding 16px out
const containerPaddingCollapseStart = intermediateWidth + 16;

export function getContainerPadding(width) {
  const paddingDelta = containerPaddingExpanded - containerPaddingCollapsed;
  const gradient = paddingDelta / (containerPaddingCollapseStart - intermediateWidth);
  const padding = gradient * width + (paddingDelta - gradient * intermediateWidth);

  return Math.min(containerPaddingExpanded, Math.max(containerPaddingCollapsed, padding));
}

export function getNavigationWidth(elem) {
  if (elem.containerHidden) {
    return collapsedWidth;
  }
  return Math.max(elem.width, intermediateWidth);
}

export function getNavigationXOffset(elem) {
  if (elem.containerHidden) {
    return 0;
  }
  return Math.min(elem.width - intermediateWidth, 0);
}

export function getExpandedWidth(elem) {
  if (elem.containerHidden) {
    return collapsedWidth;
  }
  return expandedWidth;
}

export function getCollapsedWidth() {
  return collapsedWidth;
}

export function getSpacerWidth(elem) {
  const navigationVisibleWidth = getNavigationWidth(elem) + getNavigationXOffset(elem);
  return breakpoints.filter((breakpoint) => (
    breakpoint >= navigationVisibleWidth
  )).reduce((a, b) => (a < b ? a : b));
}
