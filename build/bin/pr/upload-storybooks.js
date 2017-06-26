#!/usr/bin/env node
const spawn = require('child_process').spawn;
const fs = require('fs-extra');
const glob = require('glob').sync;
const path = require('path');

const generateIndexFile = require('./_generate-storybooks-index');
const uploadDirectory = require('../cdn/uploadDirectory');

const packagesDir = path.join(process.cwd(), 'packages');
const bbCommit = process.env.BB_COMMIT || 'BB_COMMIT';
const currentTime = `${Math.floor(new Date() / 1000)}`;
const uploadPath = `pr/${bbCommit}/${currentTime}/storybook`;

const tmpStorybooksPath = path.join(process.cwd(), 'stories', bbCommit, currentTime);

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
}

console.log('Done');

