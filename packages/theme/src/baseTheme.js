import * as colors from './colors';

export default function baseTheme(mode: string) {
  /* eslint-disable indent */
  const themePalette =
    mode === 'dark'
      ? {
          background: colors.DN30,
          text: colors.DN600,
          blue: colors.B100,
          teal: colors.T200,
          purple: colors.P100,
          red: colors.R300,
          yellow: colors.Y300,
          green: colors.G300,
        }
      : {
          background: colors.N0,
          text: colors.N900,
          blue: colors.B400,
          teal: colors.T300,
          purple: colors.P300,
          red: colors.R300,
          yellow: colors.Y300,
          green: colors.G300,
        };
  /* eslint-enable indent */
  return {
    base: {
      borderRadius: 3,
      gridSize: 8,
      fontSize: 14,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      codeFontFamily:
        '"SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Courier, monospace',
    },
    colors: {
      ...colors,
      ...themePalette,
    },
  };
}
