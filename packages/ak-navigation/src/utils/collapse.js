import {
  globalOpenWidth,
  containerClosedWidth,
  collapseBreakpoint,
  containerPaddingCollapseHorizon,
} from '../shared-variables';


export function getContainerWidth(navigationWidth) {
  if (navigationWidth > collapseBreakpoint) {
    return navigationWidth - globalOpenWidth;
  }

  return Math.max(0, containerClosedWidth);
}

export function getGlobalWidth(navigationWidth) {
  if (navigationWidth > collapseBreakpoint) {
    return globalOpenWidth;
  }

  return Math.max(0, navigationWidth - containerClosedWidth);
}

export function getContainerPadding(containerWidth, openPadding, closedPadding) {
  const paddingDelta = openPadding - closedPadding;
  const gradient = paddingDelta / containerPaddingCollapseHorizon;
  const padding = (gradient * containerWidth) + (paddingDelta - (gradient * containerClosedWidth));

  return Math.min(openPadding, Math.max(closedPadding, padding));
}
