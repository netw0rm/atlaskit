import path from 'path';
import { configure } from '@kadira/storybook';
import 'akutil-polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
const log = require('minilog')('storybook');

require('minilog').enable();


// Utilities for stories
window.React = React;
window.ReactDOM = ReactDOM;
window.uniqueWebComponent = (prefix, definition, define) =>
  define(`${prefix}-${Math.random().toString(35).substr(2, 7)}`, definition);

const req = require.context('../packages/', true, /stories\/.+-story\.js$/);

function loadStories() {
  let stories = req.keys();
  /* global PACKAGE_FOLDERS (this gets injected by the webpack config) */
  if (PACKAGE_FOLDERS.length) {
    log.info(`Storybook: Only loading stories for: ${PACKAGE_FOLDERS}`);
    stories = stories.filter((p) => PACKAGE_FOLDERS.indexOf(p.split(path.sep)[1]) !== -1);
  }
  stories.forEach(req);
}

configure(loadStories, module);
