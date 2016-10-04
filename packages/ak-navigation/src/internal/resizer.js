import * as events from './index.events';
import {
  globalCollapsedWidth,
  expandedWidth,
} from '../shared-variables.js';
import { emit } from 'skatejs';
const {
  resizeStart: resizeStartEvent,
  resizeEnd: resizeEndEvent,
} = events;


export const breakpoints = [
  globalCollapsedWidth,
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
      const boundedWidth = getBounded(currentWidth);
      navigation.width = Math.round(boundedWidth);
    },
    end() {
      const closestBreakpoint = getClosestBreakpoint(navigation.width);
      navigation.shouldAnimate = true;
      navigation.width = closestBreakpoint.breakpoint;
      emit(navigation, resizeEndEvent);
    },
  };
}
