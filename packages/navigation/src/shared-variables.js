import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
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
export const resizeAnimationTime = '200ms';
export const globalVerticalPaddingTop = akGridSizeUnitless * 3;
export const globalVerticalPaddingBottom = akGridSizeUnitless * 2;

