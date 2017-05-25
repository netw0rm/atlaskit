import {
  akColorB200,
  akGridSizeUnitless,
  akZIndexNavigation,
} from '@atlaskit/util-shared-styles';

/**
 * NOTE: changing the width of the Navigation is considered a breaking change
 */

export const gridSize = akGridSizeUnitless;

export const layout = {
  padding: {
    top: gridSize * 3,
    bottom: gridSize * 3,
    side: gridSize,
  },
  width: {
    closed: 64,
  },
};

export const globalOpenWidth = layout.width.closed;
export const containerClosedWidth = globalOpenWidth;
export const containerOpenWidth = 240;
export const standardOpenWidth = globalOpenWidth + containerOpenWidth;
export const resizeClosedBreakpoint = globalOpenWidth + (containerOpenWidth / 2);
export const collapseBreakpoint = globalOpenWidth + containerClosedWidth;
export const containerNavigationNestedPageSpacing = 8;
export const searchIconOffset = 80;
export const createIconOffset = 120;
export const animationTimeUnitless = 200;
export const animationTime = `${animationTimeUnitless}ms`;
export const resizeAnimationTime = animationTime;
export const zIndex = {
  base: akZIndexNavigation,
  drawer: akZIndexNavigation + 1,
};

// these are colors that are currently not controllable via theming
export const unthemedColors = {
  resizer: akColorB200,
};

export const globalPrimaryActions = (() => {
  const itemSizes = {
    medium: gridSize * 5,
  };

  const margin = {
    bottom: gridSize * 3.5,
  };

  const innerHeight = itemSizes.medium * 3;

  const height = {
    inner: innerHeight,
    outer: margin.bottom + innerHeight,
  };

  return {
    height,
    margin,
    itemSizes,
  };
})();
