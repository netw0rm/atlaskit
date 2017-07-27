import { flatten } from 'flat';

import baseTheme from './baseTheme';
import { FLATTENED, THEME_COMPONENTS } from './constants';

const themeCache = {};

export default function buildTheme(mode) {
  if (!themeCache[mode]) {
    const base = baseTheme(mode);
    themeCache[mode] = { ...base, mode };
    Object.keys(THEME_COMPONENTS).forEach(key => {
      themeCache[mode][key] = THEME_COMPONENTS[key](mode, base);
    });
    const flatValues = flatten(themeCache[mode]);
    themeCache[mode][FLATTENED] = flatValues;
  }
  return themeCache[mode];
}
