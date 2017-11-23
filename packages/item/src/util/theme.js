// @flow
import { colors, gridSize as akGridSize, borderRadius } from '@atlaskit/theme';

import type { ItemTheme } from '../types';

export const themeNamespace = '@atlaskit-shared-theme/item';

// Used for Group titles and Item descriptions
export const smallFontSize = 12;
export const compactSmallFontSize = 10;
export const compactLineHeight = 1.2;
export const gridSize: number = akGridSize();

export const defaultTheme: ItemTheme = {
  afterItemSpacing: {
    compact: akGridSize(),
    default: akGridSize(),
  },
  beforeItemSpacing: {
    compact: akGridSize(),
    default: akGridSize(),
  },
  borderRadius: borderRadius(),
  focus: {
    outline: colors.B100,
  },
  height: {
    compact: 0,
    default: 0,
  },
  padding: {
    default: {
      bottom: akGridSize() / 2,
      left: akGridSize() / 2,
      right: akGridSize() / 2,
      top: akGridSize() / 2,
    },
    compact: {
      bottom: akGridSize(),
      left: akGridSize(),
      right: akGridSize(),
      top: akGridSize(),
    },
  },
  default: {
    background: colors.N0,
    text: colors.N500,
    secondaryText: colors.N200,
  },
  selected: {
    background: colors.N0,
    text: colors.N500,
    secondaryText: colors.N200,
  },
  active: {
    background: colors.B75,
    text: colors.N800,
    secondaryText: colors.N200,
  },
  hover: {
    background: colors.N20,
    text: colors.N800,
    secondaryText: colors.N200,
  },
  disabled: {
    background: colors.N0,
    text: colors.N200,
    secondaryText: colors.N200,
  },
  // same as hover in this case
  dragging: {
    background: colors.N20,
    text: colors.N800,
    secondaryText: colors.N200,
  },
};

// Returns the theme that contains the requested theme key(s), preferring the user-supplied
// theme if it is provided.
export const themeWithKeys = (maybeTheme?: ItemTheme, key: string, parentKey?: string) => {
  if (parentKey) {
    return maybeTheme && maybeTheme[parentKey] && maybeTheme[parentKey][key]
      ? maybeTheme
      : defaultTheme;
  }
  return maybeTheme && maybeTheme[key] ? maybeTheme : defaultTheme;
};

// Returns the theme value for the requested key(s), falling back to the default theme if the
// user-supplied theme doesn't exist or doesn't contain the requested key(s)
export const getThemeStyle = (maybeTheme?: ItemTheme, key: string, parentKey?: string) => {
  const theme = themeWithKeys(maybeTheme, key, parentKey);
  return parentKey ? theme[parentKey][key] : theme[key];
};
