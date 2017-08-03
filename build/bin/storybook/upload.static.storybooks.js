#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

/*
    This script simply finds all the static storybooks that have been built, copies them to a temp
    directory, builds an index file and uploads them to the cdn under the path:
    https://aui-cdn.atlassian.com/atlaskit/pr/COMMIT_HASH/YYY-MM-DD_HH_MM_SS/storybook/index.html
*/

const generateIndexFile = require('./generate.index.file');
const updateBuildStatus = require('../utility/update.build.status');
const uploadDirectory = require('../utility/upload.directory.to.cdn');

const bbCommit = process.env.BITBUCKET_COMMIT || 'BB_COMMIT';

// get the date + time in the format YYYY-MM-DD_HH_MM_SS for use in url
function getCurrentTimeString() {
  const now = new Date();
  let timeString = now.toISOString().slice(0, 10);
  timeString += '_';
  timeString += now.toTimeString().slice(0, 8).replace(/:/g, '_');
  return timeString;
}

function storybookBuildStatus(state, uploadPath) {
  const cdnBaseUrl = process.env.CDN_URL_BASE;
  const cdnUrlScope = process.env.CDN_URL_SCOPE;
  const fullStorybookUrl = `${cdnBaseUrl}/${cdnUrlScope}/${uploadPath}`;
  updateBuildStatus('STORYBOOK', 'Storybook', 'The storybook for this pull request', state, fullStorybookUrl);
}

function getStaticStorybooks() {
  const packagesDir = path.join(process.cwd(), 'packages');
  return glob(path.join(packagesDir, '*', 'storybook-static', '*'));
}

try {
  const tmpStorybooksPath = path.join(process.cwd(), 'storybook-static');
  const currentTime = getCurrentTimeString();
  // The trailing slash here is required
  const uploadPath = `pr/${bbCommit}/${currentTime}/storybook/`;

  fs.ensureDirSync(tmpStorybooksPath);

  console.log(chalk.blue('Copying static storybook files...'));
  getStaticStorybooks().forEach((storybook) => {
    fs.copySync(storybook, tmpStorybooksPath);
  });

  console.log(chalk.blue('Creating index file for storybooks...'));
  generateIndexFile(tmpStorybooksPath, `Storybooks for build ${bbCommit}`);

  console.log(chalk.blue('Uploading storybook to cdn...', uploadPath));
  uploadDirectory(tmpStorybooksPath, uploadPath);

  console.log(chalk.green('Successfully uploaded storybooks'));
  storybookBuildStatus('SUCCESSFUL', uploadPath);
} catch (err) {
  console.error(chalk.red('Failed to build storybooks', err));
  storybookBuildStatus('FAILED', '');
  process.exit(1);
}

console.log(chalk.green('Done'));
