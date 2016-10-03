import * as events from './index.events';
import {
  globalCollapsedWidth,
  containerCollapsedWidth,
  expandedWidth,
} from '../shared-variables.js';
import { emit } from 'skatejs';
const {
  resizeStart: resizeStartEvent,
  resizeEnd: resizeEndEvent,
} = events;


const breakpoints = [
  globalCollapsedWidth,
  globalCollapsedWidth + containerCollapsedWidth,
  expandedWidth,
];

function getClosestBreakpoint(x) {
  return breakpoints.map((breakpoint) => ({
    breakpoint,
    distance: Math.abs(x - breakpoint),
  }))
  .reduce((a, b) => (
    a.distance < b.distance ? a : b
  ));
}


function getStickyBreakpoint(x) {
  const threshold = 25;
  const closestBreakpoint = getClosestBreakpoint(x);
  if (closestBreakpoint.distance > threshold) {
    return x;
  }
  const percentThrough = closestBreakpoint.distance / threshold;
  const stickyDistance = threshold * Math.pow(percentThrough, 1.5);
  if (closestBreakpoint.breakpoint < x) {
    return closestBreakpoint.breakpoint + stickyDistance;
  }
  return closestBreakpoint.breakpoint - stickyDistance;
}

function getBounded(x) {
  const sortedBreakpoints = breakpoints.sort((a, b) => (a > b ? -1 : 1));
  const maxWidth = sortedBreakpoints[0];
  const minWidth = sortedBreakpoints.reverse()[0];
  return Math.min(Math.max(x, minWidth), maxWidth);
}

export default function resizer(navigation) {
  let startScreenX;
  let startNavigationWidth;
  return {
    start(event) {
      navigation.shouldAnimate = false;
      startScreenX = event.screenX;
      startNavigationWidth = navigation.width;
      emit(navigation, resizeStartEvent);
    },
    resize(event) {
      const delta = event.screenX - startScreenX;
      const currentWidth = startNavigationWidth + delta;
      const stickyWidth = getStickyBreakpoint(currentWidth);
      const boundedStickyWidth = getBounded(stickyWidth);
      navigation.width = Math.round(boundedStickyWidth);
    },
    end() {
      const closestBreakpoint = getClosestBreakpoint(navigation.width);
      navigation.shouldAnimate = true;
      navigation.width = closestBreakpoint.breakpoint;
      emit(navigation, resizeEndEvent);
    },
  };
}
