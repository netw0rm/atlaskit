import { colors, themed } from '@atlaskit/theme';

// The following are the name for color mappings in @atlaskit/themes
// The exports are the functions, not the actual code snippets
const background = { light: colors.N0, dark: colors.DN30 };
const codeBlock = { light: colors.N20, dark: colors.DN50 };
const yellow = { light: colors.Y300, dark: colors.Y300 };
const linkOutline = { light: colors.B100, dark: colors.B200 };
// The following do not yet have a darkmode 'map': N20A, N10

export const getBackgroundColor = themed('appearance', {
  standard: { light: colors.N10, dark: colors.DN10 },
  disabled: codeBlock,
  invalid: { light: colors.N10, dark: colors.DN10 },
  subtle: { light: 'transparent', dark: 'transparent' },
  none: { light: 'transparent', dark: 'transparent' },
});

export const getBackgroundColorFocus = themed('appearance', {
  standard: background,
  disabled: codeBlock,
  invalid: background,
  subtle: background,
  none: { light: 'transparent', dark: 'transparent' },
});

export const getBackgroundColorHover = themed('appearance', {
  standard: codeBlock,
  disabled: codeBlock,
  invalid: codeBlock,
  subtle: codeBlock,
  none: { light: 'transparent', dark: 'transparent' },
});

export const getBorderColor = themed('appearance', {
  standard: codeBlock,
  disabled: { light: colors.N20A, dark: colors.DN20A },
  invalid: yellow,
  subtle: { light: 'transparent', dark: 'transparent' },
  none: { light: 'transparent', dark: 'transparent' },
});

export const getBorderColorFocus = themed('appearance', {
  standard: linkOutline,
  disabled: { light: colors.N20A, dark: colors.DN20A },
  invalid: linkOutline,
  subtle: linkOutline,
  none: { light: 'transparent', dark: 'transparent' },
});

export const getBorderColorHover = themed('appearance', {
  standard: codeBlock,
  disabled: { light: colors.N20A, dark: colors.DN20A },
  invalid: yellow,
  subtle: codeBlock,
  none: { light: 'transparent', dark: 'transparent' },
});
