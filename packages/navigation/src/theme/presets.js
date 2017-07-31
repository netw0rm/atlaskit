// @flow
import * as style from '@atlaskit/util-shared-styles';
import type { Provided, ItemTheme, Background } from './types';

// Currently shared by all the themes - but need not be
const focus = {
  outline: style.akColorB100,
};

export const container: Provided = ((): Provided => {
  const primaryBackground: Background = style.akColorN20;
  const item: ItemTheme = {
    default: {
      background: primaryBackground,
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
    dragging: {
      dragging: primaryBackground,
    },
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
    dragging: {
      dragging: item.hover.background,
    },
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: primaryBackground,
      tertiary: style.akColorN0,
    },
    text: style.akColorN500,
    subText: style.akColorN300,
    keyline: style.akColorN30A,
    item,
    dropdown,
  };

  return theme;
})();

export const settings: Provided = ((): Provided => {
  const primaryBackground: Background = style.akColorN800;

  const item: ItemTheme = {
    default: {
      background: primaryBackground,
    },
    hover: {
      background: style.akColorN700A,
    },
    active: {
      // Currently there is no ramp for white opacity
      background: 'rgba(255, 255, 255, 0.08)',
    },
    selected: {
      background: style.akColorN700A,
      text: style.akColorB100,
    },
    focus,
    dragging: {
      background: primaryBackground,
    },
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      // Going lighter to be different from hover
      background: style.akColorN90A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
    dragging: {
      background: item.hover.background,
    },
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: style.akColorN700,
      tertiary: style.akColorN700,
    },
    text: style.akColorN0,
    subText: style.akColorN70,
    keyline: style.akColorN900,
    item,
    dropdown,
  };

  return theme;
})();

export const global: Provided = ((): Provided => {
  const primaryBackground: Background = style.akColorB500;

  const item: ItemTheme = {
    default: {
      background: primaryBackground,
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
    dragging: {
      background: primaryBackground,
    },
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
    dragging: {
      background: item.hover.background,
    },
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: primaryBackground,
      tertiary: primaryBackground,
    },
    text: style.akColorB50,
    subText: style.akColorB75,
    keyline: style.akColorN80A,
    item,
    dropdown,
  };

  return theme;
})();
