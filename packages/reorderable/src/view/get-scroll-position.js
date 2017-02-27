// @flow
import type { Position } from '../types';

// Cross browser scroll position
// it could simply become window.scrollX and window.scrollY if we did not support ie11

const getSupportedValue = (...values: any[]): number => values.find(value => typeof value !== 'undefined') || 0;

export default (): Position => ({
  x: getSupportedValue(window.scrollX, window.pageXOffset),
  y: getSupportedValue(window.scrollY, window.pageYOffset),
});

