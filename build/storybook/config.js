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

function loadStories() {
  /* global IS_RUNNING_SINGLE_PACKAGE,
            PACKAGE_STORY_FOLDER,
            PACKAGE_FOLDERS
    (these get injected by the webpack config) */
  let stories;
  let req;

  /* Attention: refactoring this seemingly weird piece of code in the wrong way
     (e.g. calculating IS_RUNNING_SINGLE_PACKAGE at runtime and unifying the context definitions)
     will cause storybook to build much much longer
     (because webpack will evaluate both contexts and process all matching files).
  */
  if (IS_RUNNING_SINGLE_PACKAGE) {
    // we are only running a single package, so we only need to look at stories within that package
    log.info(`Only loading stories for ${PACKAGE_FOLDERS[0]}`);
    req = require.context(PACKAGE_STORY_FOLDER, false, /.+-story\.js$/);
    stories = req.keys();
  } else {
    // we are running either all packages or a number greater than 1
    req = require.context('../../packages/', true, /stories\/.+-story\.js$/);
    stories = req.keys();
    if (PACKAGE_FOLDERS.length) {
      // we are running a number greater than 1 (via a glob for example), so restrict
      log.info(`Only loading stories for: ${PACKAGE_FOLDERS}`);
      stories = stories.filter((p) => PACKAGE_FOLDERS.indexOf(p.split(path.sep)[1]) !== -1);
    }
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
