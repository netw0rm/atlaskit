
/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

import { configure } from '@kadira/storybook';

/* TODO: Load addons and global styles here */
/* Nice to have: find a way to use a glob here to automatically pick up all storybook files */

// export default function loadStoriesForPackage(packageName) {
configure(() => {
    require('../../packages/avatar/stories/index.js');
  }, module);
// }

/* Old config.js
  import { configure } from '@kadira/storybook';

  configure(() => {
    require('../../packages/app-switcher/stories/index.js');
  }, module);
 */
