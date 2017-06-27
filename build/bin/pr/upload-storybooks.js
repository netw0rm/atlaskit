#!/usr/bin/env node
const spawn = require('child_process').spawn;
const fs = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

const generateIndexFile = require('./_generate-storybooks-index');
const uploadDirectory = require('../cdn/uploadDirectory');

const packagesDir = path.join(process.cwd(), 'packages');
const bbCommit = process.env.BITBUCKET_COMMIT || 'BB_COMMIT';
const currentTime = Math.floor(new Date() / 1000);
// convert the time to format YY YY-MM-DD_HH_MM_SS for use in url
const timeString = `${currentTime.toISOString().slice(0, 10)}_${currentTime.toTimeString().slice(0, 8).replace(/:/g, '_')}`;

const uploadPath = `pr/${bbCommit}/${timeString}/storybook`;
const tmpStorybooksPath = path.join(process.cwd(), 'stories', bbCommit, timeString);

const packagesWithStaticStorybooks = glob(path.join(packagesDir, '*', 'storybook-static', '*'));

try {
  fs.ensureDirSync(tmpStorybooksPath);

  packagesWithStaticStorybooks.forEach((storybook) => {
    fs.copySync(storybook, tmpStorybooksPath);
  });

  generateIndexFile(tmpStorybooksPath, `Storybooks for build ${bbCommit}`);
  uploadDirectory(tmpStorybooksPath, uploadPath);
} catch (err) {
  console.error(err);
  process.exit(1);
}

console.log('Done');

