import {
  akColorB100,
  akColorG400,
  akColorN0,
  akColorN40,
  akColorN50A,
  akColorN60A,
  akColorN200,
  akColorN500,
  akColorN700,
  akColorR400,
  akColorY200,
} from '@atlaskit/util-shared-styles';

const theme = {
  error: {
    background: akColorR400,
    buttonTheme: 'dark',
    focusRingColor: akColorN40,
    text: akColorN0,
    shadow: akColorN50A,
  },
  info: {
    background: akColorN500,
    buttonTheme: 'dark',
    focusRingColor: akColorN40,
    text: akColorN0,
    shadow: akColorN50A,
  },
  normal: {
    background: akColorN0,
    border: akColorN60A,
    focusRingColor: akColorB100,
    text: akColorN500,
    shadow: akColorN50A,
  },
  success: {
    background: akColorG400,
    buttonTheme: 'dark',
    focusRingColor: akColorN40,
    text: akColorN0,
    shadow: akColorN50A,
  },
  warning: {
    background: akColorY200,
    border: akColorN60A,
    focusRingColor: akColorN200,
    text: akColorN700,
    shadow: akColorN50A,
  },
};

export default theme;

export function getProperty(appearance, property) {
  const prop = theme[appearance][property];

  if (!prop) {
    Error(`No matching property "${property}" for appearance "${appearance}"`);
    return undefined;
  }

  return prop;
}
