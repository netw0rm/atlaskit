// @flow

import type { ItemTheme } from './types';
import { containerTitleHorizontalPadding, containerTitleIconSpacing } from '../shared-variables';

const overrideItemTheme = (outerTheme, key): ItemTheme => {
  const original: ItemTheme = outerTheme[key];

  if (!original || !original.padding) {
    // eslint-disable-next-line no-console
    console.error(`Could not find theme with key '${key}' to modifiy it for title`);
    return outerTheme;
  }

  // TODO: deep modification while respecting types
  const newTheme: ItemTheme = (JSON.parse(JSON.stringify(original)) : any);

  newTheme.padding.default.x = containerTitleHorizontalPadding;
  newTheme.height.default = 0;
  newTheme.beforeItemSpacing.default = containerTitleIconSpacing;

  return {
    ...outerTheme,
    [key]: newTheme,
  };
};

export default overrideItemTheme;
