#!/usr/bin/env node
const childProcess = require('child_process');
const chalk = require('chalk');
const path = require('path');

// This script is run from within a package, so cwd gives us the path to a package
const cwd = process.cwd();
const packageJson = require(path.join(cwd, 'package.json')); // eslint-disable-line  import/no-dynamic-require
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const outputDir = path.join(cwd, 'storybook-static', packageName, packageVersion);

const cmdResult = childProcess.spawnSync('../../node_modules/.bin/build-storybook',
  ['-c', '../../build/storybook',
    '-o', outputDir],
  { stdio: 'inherit' }
);

if (cmdResult.status !== 0) {
  console.error(chalk.red(cmdResult.stderr, cmdResult.error));
  process.exit(cmdResult.status);
}
