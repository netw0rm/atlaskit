import { FLATTENED, THEME_COMPONENTS } from './constants';

import getTheme from './getTheme';

export * as colors from './colors';
export * as math from './math';

export themed from './themed';
export AtlasKitThemeProvider from './AtlasKitThemeProvider';

export const borderRadius = () => 3;
export const gridSize = () => 8;
export const fontSize = () => 14;
export const fontFamily = () =>
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
export const codeFontFamily = () =>
  '"SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Courier, monospace';

/* Everything below here is deprecated and will be removed before initial publish */
export const theme = getTheme;

export function addThemeComponent(name, builder) {
  if (THEME_COMPONENTS[name]) {
    throw new Error(`Theme Component ${name} is already defined`);
  }
  THEME_COMPONENTS[name] = builder;
}

export function themeValue(path) {
  return props => {
    const currentTheme = theme(props);
    if (currentTheme[FLATTENED][path] === undefined) {
      throw new Error(`Theme path ${path} is not defined`);
    }
    return currentTheme[FLATTENED][path];
  };
}
