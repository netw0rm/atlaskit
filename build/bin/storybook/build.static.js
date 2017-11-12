#!/usr/bin/env node
const childProcess = require('child_process');
const path = require('path');

// This script is run from within a package, so cwd gives us the path to a package
const cwd = process.cwd();
const packageJson = require(path.join(cwd, 'package.json')); // eslint-disable-line  import/no-dynamic-require
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const outputDir = path.join(cwd, 'storybook-static', packageName, packageVersion);

childProcess.spawn('../../node_modules/.bin/build-storybook',
  ['-c', '../../build/storybook',
    '-o', outputDir],
  { stdio: 'inherit' }
).on('close', (code) => {
  process.exit(code);
});
