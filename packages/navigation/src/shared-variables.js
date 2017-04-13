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
 * NOTE: these variables are duplicated in shared-variables.less
 * NOTE: changing the width of the Navigation is considered a breaking change
 */
export const globalOpenWidth = 64;
export const containerOpenWidth = 240;
export const containerClosedWidth = 64;
export const navigationOpenWidth = globalOpenWidth + containerOpenWidth;
export const resizeClosedBreakpoint = globalOpenWidth + (containerOpenWidth / 2);
export const collapseBreakpoint = globalOpenWidth + containerClosedWidth;
export const containerNavigationNestedPageSpacing = 8;
export const searchIconOffset = 80;
export const createIconOffset = 120;
export const animationTime = '200ms';
export const resizeAnimationTime = animationTime;
export const globalVerticalPaddingTop = akGridSizeUnitless * 3;
export const globalVerticalPaddingBottom = akGridSizeUnitless * 2;
export const globalItemMediumSize = akGridSizeUnitless * 5;
export const container = {
  padding: {
    side: Number(akGridSizeUnitless),
    top: Number(akGridSizeUnitless) * 3,
  },
  colors: {
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
  },
};
