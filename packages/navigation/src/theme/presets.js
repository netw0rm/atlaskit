// @flow
import { colors, themed } from '@atlaskit/theme';
import type { Provided, ItemTheme, Background, ScrollTheme } from './types';

// the following colors have been added at request of Venn. These should either
// be added to theme.colors or moved to specific AK colors. They are using a new
// method to generate colors dynamically based on the background color.
const darkDrawerItemHoverBackground = '#313F57';
const darkDrawerItemActiveBackground = '#2B374D';

const darkItemHoverBackground = '#253247';
const darkItemActiveBackground = '#202B3D';
const darkItemSelectedBackground = '#202B3D';

const derivedGlobalHoverBackground = '#192238';
const derivedGlobalActiveBackground = '#202B3D';
const derivedGlobalSelectedBackground = '#1D2842';

// Currently shared by all the themes - but need not be
const focus = {
  outline: themed({ light: colors.B100, dark: colors.B75 }),
};

export const container: Provided = ((): Provided => {
  const primaryBackground: Background = colors.codeBlock;
  const item: ItemTheme = {
    default: {
      background: 'transparent',
    },
    hover: {
      background: themed({ light: colors.N20A, dark: darkDrawerItemHoverBackground }),
    },
    active: {
      background: themed({ light: colors.B50, dark: darkDrawerItemActiveBackground }),
    },
    selected: {
      background: colors.N20A,
      text: colors.B400,
    },
    focus,
    dragging: {
      // similar to hover - but without opacity
      background: themed({ light: colors.N30, dark: colors.DN30 }),
    },
  };

  const scrollbar: ScrollTheme = {
    default: {
      background: colors.N20A,
    },
    hover: {
      background: themed({ light: colors.N20A, dark: darkDrawerItemHoverBackground }),
    },
  };

  const dropdown: ItemTheme = {
    default: {
      background: item.hover.background,
    },
    hover: {
      background: themed({ light: colors.N30A, dark: colors.DN30A }),
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
      tertiary: themed({ light: colors.N0, dark: colors.DN30 }),
    },
    scrollbar,
    text: themed({ light: colors.N500, dark: colors.DN600 }),
    subText: colors.subtleText,
    keyline: themed({ light: colors.N30A, dark: colors.DN30A }),
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
      background: darkItemHoverBackground,
    },
    active: {
      // Currently there is no ramp for white opacity
      background: darkItemActiveBackground,
      text: colors.B100,
    },
    selected: {
      background: darkItemSelectedBackground,
      text: colors.DN900,
    },
    focus,
    dragging: {
      // Similar to active colour - but without opacity
      background: colors.DN50,
    },
  };

  const scrollbar: ScrollTheme = {
    default: {
      background: darkItemSelectedBackground,
    },
    hover: {
      background: darkItemHoverBackground,
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
      primary: colors.DN0,
      secondary: colors.DN20,
      tertiary: colors.DN30,
    },
    scrollbar,
    text: colors.DN400,
    subText: colors.DN100,
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
      text: colors.B100,
    },
    selected: {
      background: colors.N700A,
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

  const scrollbar: ScrollTheme = {
    default: {
      background: colors.N700A,
    },
    hover: {
      background: colors.N700A,
    },
  };

  const theme: Provided = {
    background: {
      primary: primaryBackground,
      secondary: colors.N700,
      tertiary: colors.N700,
    },
    scrollbar,
    text: colors.N0,
    subText: colors.N70,
    keyline: colors.N900,
    item,
    dropdown,
  };

  return theme;
})();

export const siteSettings: Provided = ((): Provided => {
  // deep copy settings and re-assign some colors
  const theme: Provided = JSON.parse(JSON.stringify(settings));
  theme.background.secondary = colors.N800;
  theme.item.active.text = colors.B100;
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
      background: themed({ light: colors.N80A, dark: derivedGlobalHoverBackground }),
    },
    active: {
      background: themed({ light: activeBackground, dark: derivedGlobalActiveBackground }),
      text: themed({ light: colors.B50, dark: colors.B100 }),
    },
    selected: {
      background: themed({ light: colors.N50A, dark: derivedGlobalSelectedBackground }),
      text: colors.B50,
    },
    focus,
    dragging: {
      // using active colour for this preset
      background: activeBackground,
    },
  };

  const scrollbar: ScrollTheme = {
    default: {
      background: themed({ light: colors.N50A, dark: derivedGlobalSelectedBackground }),
    },
    hover: {
      background: themed({ light: colors.N80A, dark: derivedGlobalHoverBackground }),
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
      primary: themed({ light: primaryBackground, dark: colors.DN0 }),
      secondary: themed({ light: primaryBackground, dark: colors.DN0 }),
      tertiary: themed({ light: primaryBackground, dark: colors.DN0 }),
    },
    scrollbar,
    hasDarkmode: true,
    text: themed({ light: colors.B50, dark: colors.DN400 }),
    subText: themed({ light: colors.B75, dark: colors.DN100 }),
    keyline: themed({ light: colors.N80A, dark: colors.DN50 }),
    item,
    dropdown,
  };

  return theme;
})();
