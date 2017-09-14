// @flow
import { colors } from '@atlaskit/theme';
import type { Provided, ItemTheme, Background } from './types';

// Currently shared by all the themes - but need not be
const focus = {
  outline: colors.B100,
};

export const container: Provided = ((): Provided => {
  const primaryBackground: Background = colors.N20;
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: colors.N20A,
    },
    active: {
      background: colors.B50,
    },
    selected: {
      background: colors.N20A,
      text: colors.B400,
    },
    focus,
    dragging: {
      // similar to hover - but without opacity
      background: colors.N30,
    },
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      background: colors.N30A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
    dragging: item.dragging,
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: primaryBackground,
      tertiary: colors.N0,
    },
    text: colors.N500,
    subText: colors.N300,
    keyline: colors.N30A,
    item,
    dropdown,
  };

  return theme;
})();

export const dark: Provided = ((): Provided => {
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: colors.DN40,
    },
    active: {
      // Currently there is no ramp for white opacity
      background: colors.DN50,
    },
    selected: {
      background: colors.DN40,
      text: colors.B100,
    },
    focus: {
      outline: colors.B75,
    },
    dragging: {
      // Similar to active colour - but without opacity
      background: colors.DN50,
    },
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      // Going lighter to be different from hover
      background: colors.DN60,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
    dragging: item.dragging,
  };

  const theme: Provided = {
    background: {
      primary: colors.DN10,
      secondary: colors.DN20,
      tertiary: colors.DN30,
    },
    text: colors.DN600,
    subText: colors.DN400,
    keyline: colors.DN50,
    item,
    dropdown,
  };

  return theme;
})();

export const settings: Provided = ((): Provided => {
  const primaryBackground: Background = colors.N800;

  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: colors.N700A,
    },
    active: {
      // Currently there is no ramp for white opacity
      background: 'rgba(255, 255, 255, 0.08)',
    },
    selected: {
      background: colors.N700A,
      text: colors.B100,
    },
    focus,
    dragging: {
      // Similar to active colour - but without opacity
      background: colors.N600,
    },
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      // Going lighter to be different from hover
      background: colors.N90A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
    dragging: item.dragging,
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: colors.N700,
      tertiary: colors.N700,
    },
    text: colors.N0,
    subText: colors.N70,
    keyline: colors.N900,
    item,
    dropdown,
  };

  return theme;
})();

export const siteSettings: Provided = ((): Provided => {
  // deep copy settings and only re-assign the secondary color
  const theme: Provided = JSON.parse(JSON.stringify(settings));
  theme.background.secondary = colors.N800;
  return theme;
})();

export const global: Provided = ((): Provided => {
  const primaryBackground: Background = colors.B500;
  const activeBackground: Background = colors.B200;
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: colors.N80A,
    },
    active: {
      background: activeBackground,
    },
    selected: {
      background: colors.N50A,
      text: colors.B50,
    },
    focus,
    dragging: {
      // using active colour for this preset
      background: activeBackground,
    },
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      // going darker than standard hover
      background: colors.N90A,
    },
    active: item.active,
    selected: item.selected,
    focus: item.focus,
    dragging: item.dragging,
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: primaryBackground,
      tertiary: primaryBackground,
    },
    text: colors.B50,
    subText: colors.B75,
    keyline: colors.N80A,
    item,
    dropdown,
  };

  return theme;
})();
