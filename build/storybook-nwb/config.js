/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

import { configure } from '@kadira/storybook';

configure(() => {
  require('../../packages/app-switcher/stories/index.js');
}, module);
