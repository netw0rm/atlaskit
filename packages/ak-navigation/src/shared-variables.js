// NOTE: this is duplicated in shared-variables.less
export const globalOpenWidth = 64;
export const containerOpenWidth = 220;
export const containerClosedWidth = 64;
export const navigationOpenWidth = globalOpenWidth + containerOpenWidth;
export const resizeClosedBreakpoint = globalOpenWidth + (containerOpenWidth / 2);
export const resizeExpandedBreakpoint = navigationOpenWidth + 50;
export const collapseBreakpoint = globalOpenWidth + containerClosedWidth;
