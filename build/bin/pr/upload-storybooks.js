#!/usr/bin/env node
const fs = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

const generateIndexFile = require('./_generate-storybooks-index');
const updateBuildStatus = require('../utility/build_status');
const uploadDirectory = require('../cdn/uploadDirectory');

const bbCommit = process.env.BITBUCKET_COMMIT;
const bbBranch = process.env.BITBUCKET_BRANCH;

// get the date + time in the format YYYY-MM-DD_HH_MM_SS for use in url
function getCurrentTimeString() {
  const now = new Date();
  let timeString = now.toISOString().slice(0, 10);
  timeString += '_';
  timeString += now.toTimeString().slice(0, 8).replace(/:/g, '_');
  return timeString;
}

function getUploadPath() {
  if (bbBranch === 'master') {
    return 'stories';
  }
  return `pr/${bbCommit}/${getCurrentTimeString()}/storybook`;
}

function storybookBuildStatus(state) {
  const cdnBaseUrl = process.env.CDN_URL_BASE;
  const cdnUrlScope = process.env.CDN_URL_SCOPE;
  const uploadPath = getUploadPath();
  const fullStorybookUrl = `${cdnBaseUrl}/${cdnUrlScope}/${uploadPath}`;
  updateBuildStatus('STORYBOOK', 'Storybook', 'The storybook for this pull request', state, fullStorybookUrl);
}

function getStaticStorybooks() {
  const packagesDir = path.join(process.cwd(), 'packages');
  return glob(path.join(packagesDir, '*', 'storybook-static', '*'));
}

try {
  const tmpStorybooksPath = path.join(process.cwd(), 'storybook-static');
  const uploadPath = getUploadPath();

  fs.ensureDirSync(tmpStorybooksPath);

  getStaticStorybooks().forEach((storybook) => {
    fs.copySync(storybook, tmpStorybooksPath);
  });

  generateIndexFile(tmpStorybooksPath, `Storybooks for build ${bbCommit}`);

  uploadDirectory(tmpStorybooksPath, uploadPath);

  storybookBuildStatus('SUCCESSFUL');
} catch (err) {
  storybookBuildStatus('FAILED');
  console.error(err);
  process.exit(1);
}

console.log('Done');
