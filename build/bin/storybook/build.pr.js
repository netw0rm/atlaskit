#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

/*
    This script builds all the storybooks for a given PR in CI. It builds for all packages that have
    a changed file but can be disabled using the BRANCHES_ALLOWED_TO_BUILD_STORYBOOKS variable (see
    exit.if.branch.name.not.matches.js).

    PR builds are uploaded to the cdn under the path:
    https://aui-cdn.atlassian.com/atlaskit/pr/COMMIT_HASH/YYY-MM-DD_HH_MM_SS/storybook/index.html
*/

const generateIndexFile = require('./generate.index.file');
const updateBuildStatus = require('../utility/update.build.status');
const uploadDirectory = require('../utility/upload.directory.to.cdn');
const exitIfBranchNameNotMatches = require('../exit.if.branch.name.not.matches');

const bbCommit = process.env.BITBUCKET_COMMIT;
const branchNameWhitelist = process.env.BRANCHES_ALLOWED_TO_BUILD_STORYBOOKS;

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

  // Escape hatch using env vars so we can not build storybooks for sweeping changes
  exitIfBranchNameNotMatches(branchNameWhitelist);

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
