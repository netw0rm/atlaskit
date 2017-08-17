// @flow

import {
  akBorderRadius,
  akColorB100,
  akColorB75,
  akColorN0,
  akColorN20,
  akColorN200,
  akColorN500,
  akColorN800,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

import type { ItemTheme } from '../types';

export const themeNamespace = '@atlaskit-shared-theme/item';

// Used for Group titles and Item descriptions
export const smallFontSize = 12;
export const compactSmallFontSize = 10;

export const defaultTheme: ItemTheme = {
  afterItemSpacing: akGridSizeUnitless,
  beforeItemSpacing: akGridSizeUnitless,
  borderRadius: parseInt(akBorderRadius, 10),
  focus: {
    outline: akColorB100,
  },
  height: {
    compact: 0,
    default: 0,
  },
  padding: {
    default: {
      x: akGridSizeUnitless / 2,
      y: akGridSizeUnitless / 2,
    },
    compact: {
      x: akGridSizeUnitless,
      y: akGridSizeUnitless,
    },
  },
  default: {
    background: akColorN0,
    text: akColorN500,
    secondaryText: akColorN200,
  },
  selected: {
    background: akColorN0,
    text: akColorN500,
    secondaryText: akColorN200,
  },
  active: {
    background: akColorB75,
    text: akColorN800,
    secondaryText: akColorN200,
  },
  hover: {
    background: akColorN20,
    text: akColorN800,
    secondaryText: akColorN200,
  },
  disabled: {
    background: akColorN0,
    text: akColorN200,
    secondaryText: akColorN200,
  },
  // same as hover in this case
  dragging: {
    background: akColorN20,
    text: akColorN800,
    secondaryText: akColorN200,
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
