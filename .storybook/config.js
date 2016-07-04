import path from 'path';
import { configure, setAddon } from '@kadira/storybook';
import 'akutil-polyfills';
import MonitoredStory from './MonitoredStory.js';
import React from 'react';
import ReactDOM from 'react-dom';
import minilog from 'minilog';
minilog.enable();
const log = minilog('storybook');


// Utilities for stories
window.React = React;
window.ReactDOM = ReactDOM;
window.uniqueWebComponent = (prefix, definition, define) =>
  define(`${prefix}-${Math.random().toString(35).substr(2, 7)}`, definition);

window.uniqueWebComponentOld = (Wc, define) => {
  const tagName = new Wc().tagName;
  return define(`${tagName}-${Math.random().toString(35).substr(2, 7)}`, class extends Wc {});
};

const req = require.context('../packages/', true, /stories\/.+-story\.js$/);

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
});

configure(loadStories, module);
