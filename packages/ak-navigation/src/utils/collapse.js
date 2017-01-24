import {
  globalOpenWidth,
  containerClosedWidth,
  collapseBreakpoint,
} from '../shared-variables';

export default function getContainerWidth(navigationWidth) {
  if (navigationWidth > collapseBreakpoint) {
    return navigationWidth - globalOpenWidth;
  }

  return Math.max(0, containerClosedWidth);
}
