/* eslint-disable prefer-rest-params */

import getTheme from './getTheme';

function themedVariants(variantProp, variants) {
  return props => {
    const theme = getTheme(props);
    const modes = variants[props[variantProp]];
    if (!modes) return undefined;
    return modes[theme.mode];
  };
}

export default function themed(modes) {
  if (typeof modes === 'string') {
    return themedVariants(...arguments);
  }
  return props => {
    const theme = getTheme(props);
    return modes[theme.mode];
  };
}
