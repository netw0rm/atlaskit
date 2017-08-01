import { colors, themed } from '../../theme/src';

// eslint-disable-next-line import/prefer-default-export
export const PKG_NM = 'dynamic-table';

export const arrow = {
  defaultColor: themed({ light: colors.N40, dark: colors.DN40 }),
  selectedColor: themed({ light: colors.N300, dark: colors.DN300 }),
  hoverColor: themed({ light: colors.N60, dark: colors.DN60 }),
};

export const row = {
  hoverBackground: themed({ light: colors.N10, dark: colors.DN40 }),
};

export const head = {
  borderColor: themed({ light: colors.N40, dark: colors.DN50 }),
  textColor: themed({ light: colors.N300, dark: colors.DN300 }),
};
