import {
  globalCollapsedWidth,
  containerCollapsedWidth,
  expandedWidth,
  containerPaddingExpanded,
} from '../shared-variables';

const intermediateWidth = globalCollapsedWidth + containerCollapsedWidth;
const collapsedWidth = globalCollapsedWidth;

const containerPaddingCollapsed = 10;
// start collapsing the padding 16px out
const containerPaddingCollapseStart = intermediateWidth + 16;

function getContainerPadding(currentWidth) {
  const paddingDelta = containerPaddingExpanded - containerPaddingCollapsed;
  const gradient = paddingDelta / (containerPaddingCollapseStart - intermediateWidth);
  const padding = (gradient * currentWidth) + (paddingDelta - (gradient * intermediateWidth));

  return Math.min(containerPaddingExpanded, Math.max(containerPaddingCollapsed, padding));
}

function getTotalWidth(visibleWidth) {
  return Math.max(visibleWidth, intermediateWidth);
}

function getNavigationXOffset(visibleWidth) {
  return Math.min(visibleWidth - intermediateWidth, 0);
}

function getBounded(x) {
  return Math.min(Math.max(x, collapsedWidth), expandedWidth);
}

export default function calculateCollapseProperties({
  open,
  resizeDelta,
  containerHidden,
}) {
  if (containerHidden) {
    return {
      visibleWidth: collapsedWidth,
      totalWidth: collapsedWidth,
      xOffset: 0,
      containerPadding: 0,
    };
  }

  const visibleWidth = (open ? expandedWidth : collapsedWidth) + resizeDelta;
  const boundedVisibleWidth = getBounded(visibleWidth);
  return {
    visibleWidth: boundedVisibleWidth,
    totalWidth: getTotalWidth(boundedVisibleWidth),
    xOffset: getNavigationXOffset(boundedVisibleWidth),
    containerPadding: getContainerPadding(boundedVisibleWidth),
  };
}
