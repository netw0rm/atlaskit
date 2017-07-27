/* eslint-disable no-nested-ternary */

import buildTheme from './buildTheme';
import { CHANNEL, DEAULT_THEME_MODE } from './constants';

export default function getTheme(props) {
  return props.theme && props.theme[CHANNEL]
    ? props.theme[CHANNEL]
    : buildTheme(DEAULT_THEME_MODE);
}
