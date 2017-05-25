// @flow
import * as style from '@atlaskit/util-shared-styles';
import type { Text, Theme, ItemTheme } from './types';

// Currently shared by all the themes - but need not be
const focus = {
  outline: style.akColorB100,
};

export const container: Theme = ((): Theme => {
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: style.akColorN20A,
    },
    active: {
      background: style.akColorB50,
    },
    selected: {
      background: style.akColorN20A,
      text: style.akColorB400,
    },
    focus,
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      background: style.akColorN30A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
  };

  const theme: Theme = {
    background: {
      primary: style.akColorN20,
      secondary: style.akColorN20,
      tertiary: style.akColorN0,
    },
    text: style.akColorN500,
    subText: style.akColorN300,
    keyline: style.akColorN30A,
    item,
    dropdown,
    group: {
      title: style.akColorN90,
    },
  };

  return theme;
})();

export const settings: Theme = ((): Theme => {
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: style.akColorN700A,
    },
    active: {
      background: 'rgba(255, 255, 255, 0.08)',
    },
    selected: {
      background: style.akColorN700A,
    },
    focus,
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      // going lighter to be different from hover
      background: style.akColorN90A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
  };

  const theme: Theme = {
    background: {
      primary: style.akColorN800,
      secondary: style.akColorN700,
      tertiary: style.akColorN700,
    },
    text: style.akColorN0,
    subText: style.akColorN90,
    keyline: style.akColorN900,
    item,
    dropdown,
    group: {
      title: style.akColorN90,
    },
  };

  return theme;
})();

export const global: Theme = ((): Theme => {
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: style.akColorN80A,
    },
    active: {
      background: style.akColorB200,
    },
    selected: {
      background: style.akColorN50A,
    },
    focus,
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      // going darker than standard hover
      background: style.akColorN90A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
  };

  const theme: Theme = {
    background: {
      primary: style.akColorB500,
      secondary: style.akColorB500,
      tertiary: style.akColorB500,
    },
    text: style.akColorN0,
    subText: style.akColorB75,
    keyline: style.akColorN80A,
    item,
    dropdown,
    group: {
      title: style.akColorB75,
    },
  };

  return theme;
})();
