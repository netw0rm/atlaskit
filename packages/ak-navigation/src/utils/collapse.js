import {
  globalOpenWidth,
  containerClosedWidth,
  collapseBreakpoint,
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
