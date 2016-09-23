import { configure, setAddon } from '@kadira/storybook';
import 'akutil-polyfills';
import MonitoredStory from './MonitoredStory.js';
import MonkeyTestStory from './MonkeyTestStory.js';
import SwappedDirectionStory from './SwappedDirectionStory.js';
import React from 'react';

import 'style!./styles.less';

function loadStories() {
  // Use a webpack loader to dynamically require stories.
  //
  // Normally you would use webpack's `require.context(…, true, …)` API within
  // the client code and webpack would transform that for you, but in our case
  // we can't use that due to lerna's symlinking strategy, and the lack of
  // support for symlink cycles from `require.context()`.
  require('./requireStories!./empty'); // eslint-disable-line global-require
}

setAddon({
  addMonitored(storyName, storyFn, rafFn) {
    this.add(storyName, (context) => (
      <MonitoredStory rafFn={rafFn}>
        {storyFn(context)}
      </MonitoredStory>
    ));
  },

  addMonkeyTest(storyName, storyFn) {
    this.add(storyName, (context) => (
      <MonkeyTestStory>
        {storyFn(context)}
      </MonkeyTestStory>
    ));
  },

  addSwapped(storyName, storyFn) {
    this.add(storyName, (context) => (
      <SwappedDirectionStory>
        {storyFn(context)}
      </SwappedDirectionStory>
    ));
  },
});

configure(loadStories, module);
