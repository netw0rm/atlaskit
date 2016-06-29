import path from 'path';
import { configure, setAddon } from '@kadira/storybook';
import 'akutil-polyfills';
import React from 'react';
import ReactDOM from 'react-dom';


// Utilities for stories
window.React = React;
window.ReactDOM = ReactDOM;
window.uniqueWebComponent = function (prefix, definition, define) {
  return define(prefix + '-' + Math.random().toString(35).substr(2, 7), definition);
};

const req = require.context(`../packages/`, true, /stories\/.+-story\.js$/);

function loadStories() {
  let stories = req.keys();
  if (PACKAGE_FOLDERS.length) {
    console.log(`Storybook: Only loading stories for: ${PACKAGE_FOLDERS}`);
    stories = stories.filter((p) => PACKAGE_FOLDERS.indexOf(p.split(path.sep)[1]) !== -1)
  }
  stories.forEach(req);
}

setAddon({
  addWithMonkeyTest(storyName, storyFn) {
    this.monkeyTestStoryNames = this.monkeyTestStoryNames || [];
    this.monkeyTestStoryNames.push(storyName);
    this.add(storyName, storyFn);
  },

  addWithIntegrationTest(storyName, storyFn) {
    this.integrationStoryNames = this.integrationStoryNames || [];
    this.integrationStoryNames.push(storyName);
    this.add(storyName, storyFn);
  }
});

configure(loadStories, module);
