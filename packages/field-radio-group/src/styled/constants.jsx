import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

// Border
export const borderWidth = 1; // 1
export const borderWidthFocus = 2; // 2

// Full size
export const fullHeight = akGridSizeUnitless * 1.5; // 12
export const fullWidth = akGridSizeUnitless * 1.5; // 12

// Minus border width
export const height = fullHeight - (2 * borderWidth); // 10
export const width = fullWidth - (2 * borderWidth); // 10

// Horizontal padding around icon
export const maxIconWidth = fullWidth + (borderWidthFocus * 2); // 16
export const iconHorizontalPadding = ((3 * width) - maxIconWidth) / 2; // 7

// Size of inner selection circle
export const innerWidth = akGridSizeUnitless / 2; // 4
export const innerHeight = akGridSizeUnitless / 2; // 4
