/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

import { configure, setAddon } from '@kadira/storybook';
import '!style-loader!css-loader!ak-css-reset/dist/bundle.css';
import '!style-loader!css-loader!highlight.js/styles/github.css';

import './styles.less';

function loadStories() {
  // Use a webpack loader to dynamically require stories.
  //
  // Normally you would use webpack's `require.context(…, true, …)` API within
  // the client code and webpack would transform that for you, but in our case
  // we can't use that due to lerna's symlinking strategy, and the lack of
  // support for symlink cycles from `require.context()`.
  require('./requireStories!./empty'); // eslint-disable-line global-require
}

// We add all these addons here so that we don't have to modify any of the existing storybook files
// and still have them work (they will just add the story normally)

setAddon({
  addMonitored(storyName, storyFn) {
    this.add(storyName, storyFn);
  },
  addBaselineAligned(storyName, storyFn) {
    this.add(storyName, storyFn);
  },
  addStencilStory(storyName, storyFn) {
    this.add(storyName, storyFn);
  },
  addCodeExampleStory(storyName, storyFn) {
    this.add(storyName, storyFn);
  },
  addExampleWithCodeStory(storyName, storyFn) {
    this.add(storyName, storyFn);
  },
});

configure(loadStories, module);
