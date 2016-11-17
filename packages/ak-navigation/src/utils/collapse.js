import {
  globalOpenWidth,
  containerClosedWidth,
  collapseBreakpoint,
  containerOpenPadding,
  containerClosedPadding,
  containerPaddingCollapseHorizon,
} from './style-variables';


export function getContainerWidth(navigationWidth) {
  if (navigationWidth > collapseBreakpoint) {
    return navigationWidth - globalOpenWidth;
  }

  return containerClosedWidth;
}

export function getGlobalWidth(navigationWidth) {
  if (navigationWidth > collapseBreakpoint) {
    return globalOpenWidth;
  }

  return navigationWidth - containerClosedWidth;
}

export function getContainerPadding(navigationWidth) {
  const paddingDelta = containerOpenPadding - containerClosedPadding;
  const gradient = paddingDelta / containerPaddingCollapseHorizon;
  const padding = (gradient * navigationWidth) + (paddingDelta - (gradient * collapseBreakpoint));

  return Math.min(containerOpenPadding, Math.max(containerClosedPadding, padding));
}
