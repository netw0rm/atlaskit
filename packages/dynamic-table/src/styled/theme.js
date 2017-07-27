import { addThemeComponent } from '../../../theme/src';

// eslint-disable-next-line import/prefer-default-export
export const PKG_NM = 'dynamic-table';

addThemeComponent(PKG_NM, (mode, theme) => {
  const dark = mode === 'dark';

  return {
    common: {
      baselineUnit: theme.base.gridSize / 2,
    },
    arrow: {
      color: {
        default: dark ? theme.colors.DN40 : theme.colors.N40,
        selected: dark ? theme.colors.DN300 : theme.colors.N300,
        hover: dark ? theme.colors.DN60 : theme.colors.N60,
      },
    },
    tr: {
      background: {
        hover: dark ? theme.colors.DN10 : theme.colors.N10,
      },
    },
    th: {
      border: {
        color: dark ? theme.colors.DN40 : theme.colors.N40,
      },
      text: {
        color: dark ? theme.colors.DN300 : theme.colors.N300,
      },
    },
  };
});
