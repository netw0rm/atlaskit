import { colors, themed } from '@atlaskit/theme';

export const backgroundColor = themed('appearance', {
  added: { light: colors.G50, dark: colors.G50 },
  primaryInverted: { light: colors.N0, dark: colors.DN400 },
  default: { light: colors.N30, dark: colors.DN70 },
  important: { light: colors.R300, dark: colors.R300 },
  primary: { light: colors.B400, dark: colors.B100 },
  removed: { light: colors.R50, dark: colors.R50 },
});

export const textColor = themed('appearance', {
  added: { light: colors.G500, dark: colors.G500 },
  primaryInverted: { light: colors.B500, dark: colors.DN0 },
  default: { light: colors.N800, dark: colors.DN900 },
  important: { light: colors.N0, dark: colors.N0 },
  primary: { light: colors.N0, dark: colors.DN0 },
  removed: { light: colors.R500, dark: colors.R500 },
});
