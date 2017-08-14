/* eslint-disable no-nested-ternary */

import { CHANNEL, DEAULT_THEME_MODE } from './constants';

const defaultTheme = { mode: DEAULT_THEME_MODE };

export default function getTheme(props) {
  return props.theme && props.theme[CHANNEL]
    ? props.theme[CHANNEL]
    : defaultTheme;
}
