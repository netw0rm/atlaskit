import { configure, setAddon } from '@kadira/storybook';
import 'akutil-polyfills';
import React from 'react';
import 'storybook-addon-i18n-tools';

import 'style!./styles.less';

import MonitoredStory from './MonitoredStory';
import MonkeyTestStory from './MonkeyTestStory';
import BaselineAlignmentStory from './BaselineAlignmentStory';


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
    this.add(storyName, context => (
      <MonitoredStory rafFn={rafFn}>
        {storyFn(context)}
      </MonitoredStory>
    ));
  },

  addMonkeyTest(storyName, storyFn) {
    this.add(storyName, context => (
      <MonkeyTestStory>
        {storyFn(context)}
      </MonkeyTestStory>
    ));
  },

  addBaselineAligned(storyName, storyFn) {
    this.add(storyName, context => (
      <BaselineAlignmentStory>
        {storyFn(context)}
      </BaselineAlignmentStory>
    ));
  },
});

configure(loadStories, module);
