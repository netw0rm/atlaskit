#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { tmpFolderName } = require('./constants');
const fileToScope = require('./fileToScope');
const getAllIconsPaths = require('./getAllIconsPaths');

const bytebucketIconPath = 'https://bytebucket.org/atlassian/atlaskit/raw/master/packages/ak-icon';
const rootFolder = path.join(__dirname, '..');
const staticUsageFileLocation = path.join(rootFolder, 'docs', '_USAGE.md');
const tmpFolder = `${path.join('..', 'src', tmpFolderName)}${path.sep}`;
const allIconPaths = getAllIconsPaths();

/* eslint-disable  no-console */
fs.readFile(staticUsageFileLocation, 'utf8', (err, usageFile) => {
  if (err) throw err;
  // empty line required to make the comments not show in the rendered html
  // http://stackoverflow.com/questions/4823468/comments-in-markdown/32190021#32190021
  console.log('');
  console.log('[comment]: # (#################################################################);');
  console.log('');
  console.log('[comment]: # (### THIS FILE IS GENERATED!! - USE THE _USAGE.MD FILE INSTEAD ###);');
  console.log('');
  console.log('[comment]: # (#################################################################);');

  // output the static usage file
  console.log(usageFile);

  // now output the icons section
  console.log('# Icons');
  console.log('These are the icons that are currently bundled in `ak-icon`. You can mouse-over');
  console.log('each to see their name.');
  console.log('');
  console.log('For more detailed usage of each one, see the storybook on the AtlasKit registry');
  console.log('[registry](https://aui-cdn.atlassian.com/atlaskit/stories/ak-icon/@VERSION@/);.');
  console.log('');

  allIconPaths.forEach((iconPath) => {
    // convert from path in `../src/tmp/bitbucket/projects.js` form to `bitbucket/projects` form
    const iconScope = fileToScope(iconPath, tmpFolder);
    const url = `${bytebucketIconPath}/src/icons/${iconScope}.svg`;
    const mardownImg = `!["${iconScope}"](${url} "${iconScope}")`;
    console.log(mardownImg);
  });
});
/* eslint-enable  no-console */
