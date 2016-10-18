import { props, emit } from 'skatejs';
import * as events from './index.events';
import {
  globalCollapsedWidth,
  expandedWidth,
} from '../shared-variables.js';


const {
  resizeStart: resizeStartEvent,
  resizeEnd: resizeEndEvent,
} = events;

const minBreakpoint = globalCollapsedWidth;
const maxBreakpoint = expandedWidth;

function getClosestBreakpoint(x) {
  const minBreakpointDistance = Math.abs(minBreakpoint - x);
  const maxBreakpointDistance = Math.abs(maxBreakpoint - x);
  return minBreakpointDistance < maxBreakpointDistance ? minBreakpoint : maxBreakpoint;
}

function getBounded(x) {
  return Math.min(Math.max(x, minBreakpoint), maxBreakpoint);
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
      props(navigation, {
        width: Math.round(boundedWidth),
      });
    },
    end() {
      const closestBreakpoint = getClosestBreakpoint(navigation.width);
      navigation.shouldAnimate = true;
      navigation.width = closestBreakpoint;
      emit(navigation, resizeEndEvent);
    },
  };
}
