import { configure, setAddon, addDecorator } from '@kadira/storybook';
import 'akutil-polyfills';
import React from 'react';
import 'storybook-addon-i18n-tools';
import { checkA11y } from 'storybook-addon-a11y/dist';
import 'style-loader!css-loader!ak-css-reset/dist/bundle.css';
import 'style-loader!css-loader!highlight.js/styles/github.css';
import 'style-loader!css-loader!./panels.css';

import 'style!./styles.less';

import MonitoredStory from './MonitoredStory';
import MonkeyTestStory from './MonkeyTestStory';
import BaselineAlignmentStory from './BaselineAlignmentStory';
import CodeExampleStory from './CodeExampleStory';

function loadStories() {
  // Use a webpack loader to dynamically require stories.
  //
  // Normally you would use webpack's `require.context(…, true, …)` API within
  // the client code and webpack would transform that for you, but in our case
  // we can't use that due to lerna's symlinking strategy, and the lack of
  // support for symlink cycles from `require.context()`.
  require('./requireStories!./empty'); // eslint-disable-line global-require
}

addDecorator(checkA11y);

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

  addCodeExampleStory(storyName, storyFn, options) {
    console.log('options.scripts', options.scripts);
    this.add(storyName, context => (
      <CodeExampleStory
        scripts={options.scripts}
      >
        {storyFn(context)}
      </CodeExampleStory>
    ));
  },
});

configure(loadStories, module);
