#!/usr/bin/env node
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

if (process.argv[2]) {
  // if we are passed a command line arg, we are probably being called from outside a package and
  // the arg is the package we should cd into
  const pkgDir = path.join(__dirname, '..', '..', '..', 'packages', process.argv[2]);
  if (fs.existsSync(pkgDir)) {
    console.log(`CD'ing into directory ${pkgDir}`);
    process.chdir(pkgDir);
  } else {
    console.error(`Could not find a package at "${pkgDir}"`);
    process.exit(1);
  }
} else if (!/\/packages\/.+/.test(process.cwd())) {
  // if we arent in a package, exit gracefully
  console.error('Please specify a package to run storybooks for');
  process.exit(1);
}

childProcess.spawn('../../node_modules/.bin/start-storybook',
  ['-c', '../../build/storybook',
    '-p', '9001'],
  { stdio: 'inherit' }
).on('error', process.exit);
