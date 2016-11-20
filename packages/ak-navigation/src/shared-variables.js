// NOTE: this is duplicated in shared-variables.less
export const globalOpenWidth = 64;
export const containerOpenWidth = 220;
export const containerClosedWidth = 64;
export const containerHeaderOpenPadding = 20;
export const containerHeaderClosedPadding = 12;
export const containerBodyOpenPadding = 8;
export const containerBodyClosedPadding = 6;
export const containerPaddingCollapseHorizon = 20;
export const navigationOpenWidth = globalOpenWidth + containerOpenWidth;
export const resizeClosedBreakpoint = globalOpenWidth + (containerOpenWidth / 2);
export const resizeExpandedBreakpoint = navigationOpenWidth + 50;
export const collapseBreakpoint = globalOpenWidth + containerClosedWidth;
