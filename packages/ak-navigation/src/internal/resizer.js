import { props, emit } from 'skatejs';
import * as events from './index.events';
import {
  globalCollapsedWidth,
  expandedWidth,
} from '../shared-variables';
import calculateCollapseProperties from './collapse-properties';
import {
  resizeDelta,
} from './symbols';


const {
  resizeStart: resizeStartEvent,
  resizeEnd: resizeEndEvent,
} = events;

function shouldBeOpen(navigation) {
  const { visibleWidth } = calculateCollapseProperties({
    open: navigation.open,
    containerHidden: navigation.containerHidden,
    resizeDelta: navigation[resizeDelta],
  });
  const closedDistance = Math.abs(globalCollapsedWidth - visibleWidth);
  const openDistance = Math.abs(expandedWidth - visibleWidth);
  return openDistance < closedDistance;
}

export default function resizer(navigation) {
  let startScreenX;
  return {
    start(event) {
      navigation.shouldAnimate = false;
      startScreenX = event.screenX;
      props(navigation, {
        [resizeDelta]: 0,
      });
      emit(navigation, resizeStartEvent);
    },
    resize(event) {
      props(navigation, {
        [resizeDelta]: event.screenX - startScreenX,
      });
    },
    end() {
      // const closestBreakpoint = getClosestBreakpoint(navigation.width);
      navigation.shouldAnimate = true;
      // navigation.width = closestBreakpoint;
      props(navigation, {
        [resizeDelta]: 0,
        open: shouldBeOpen(navigation),
      });
      emit(navigation, resizeEndEvent);
    },
  };
}
