import path from 'path';
import { configure } from '@kadira/storybook';
import 'akutil-polyfills';
import React from 'react';
import ReactDOM from 'react-dom';


// Utilities for stories
window.React = React;
window.ReactDOM = ReactDOM;
window.uniqueWebComponent = function (wc, define) {
  const tagName = new wc().tagName;
  return define(tagName + '-' + Math.random().toString(35).substr(2, 7), class extends wc {});
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

configure(loadStories, module);
