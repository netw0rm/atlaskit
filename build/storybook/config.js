import { configure, setAddon } from '@kadira/storybook';
import 'babel-polyfill';
import React from 'react';
import 'storybook-addon-i18n-tools';
import 'style-loader!css-loader!ak-css-reset/dist/bundle.css';
import 'style-loader!css-loader!highlight.js/styles/github.css';

import './styles.less';

import MonitoredStory from './MonitoredStory';
import BaselineAlignmentStory from './BaselineAlignmentStory';
import CodeExampleStory from './CodeExampleStory';
import StencilStory from './StencilStory';

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

  addBaselineAligned(storyName, storyFn) {
    this.add(storyName, context => (
      <BaselineAlignmentStory>
        {storyFn(context)}
      </BaselineAlignmentStory>
    ));
  },

  addStencilStory(storyName, storyFn, options = {}) {
    this.add(`✏️️ ${storyName}`, context => (
      <StencilStory {...options}>
        {storyFn(context)}
      </StencilStory>
    ));
  },

  addCodeExampleStory(storyName, storyFn, options = {}) {
    this.add(`${storyName} (Code Examples)`, context => (
      <CodeExampleStory
        scripts={options.scripts}
        imports={options.imports}
        overrides={options.overrides}
      >
        {storyFn(context)}
      </CodeExampleStory>
    ));
  },
});

configure(loadStories, module);
