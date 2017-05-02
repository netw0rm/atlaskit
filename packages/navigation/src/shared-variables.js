import {
  akColorN0,
  akColorN20,
  akColorN500,
  akColorN700,
  akColorB500,
  akColorN80,
  akColorN30A,
  akColorN900,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

/**
 * NOTE: changing the width of the Navigation is considered a breaking change
 */

export const layout = {
  padding: {
    top: akGridSizeUnitless * 3,
    bottom: akGridSizeUnitless * 3,
    side: akGridSizeUnitless,
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
export const animationTime = '200ms';
export const resizeAnimationTime = animationTime;

export const colors = {
  container: {
    background: akColorN20,
    color: akColorN500,
    keyline: akColorN30A,
  },
  global: {
    background: akColorB500,
    color: akColorN0,
    keyline: akColorN80,
  },
  settings: {
    background: akColorN700,
    color: akColorN0,
    keyline: akColorN900,
  },
};

export const globalPrimaryActions = (() => {
  const itemSizes = {
    medium: akGridSizeUnitless * 5,
  };

  const margin = {
    bottom: akGridSizeUnitless * 3.5,
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
