import path from 'path';
import { configure, setAddon } from '@kadira/storybook';
import 'akutil-polyfills';
import MonitoredStory from './MonitoredStory.js';
import MonkeyTestStory from './MonkeyTestStory.js';
import React from 'react';
import ReactDOM from 'react-dom';
import minilog from 'minilog';
minilog.enable();
const log = minilog('storybook');

// Utilities for stories
window.React = React;
window.ReactDOM = ReactDOM;

const req = require.context('../../packages/', true, /stories\/.+-story\.js$/);

function loadStories() {
  let stories = req.keys();
  /* global PACKAGE_FOLDERS (this gets injected by the webpack config) */
  if (PACKAGE_FOLDERS.length) {
    log.info(`Only loading stories for: ${PACKAGE_FOLDERS}`);
    stories = stories.filter((p) => PACKAGE_FOLDERS.indexOf(p.split(path.sep)[1]) !== -1);
  }
  stories.forEach(req);
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
});

configure(loadStories, module);
