#!/usr/bin/env node
const chalk = require('chalk');
const exec = require('child-process-promise').exec;
const fs = require('fs');
const path = require('path');

const changedFilesToChangedPackages = require('./_changed_files_to_changed_packages');
/*
  This file is adapted from the existing _get_changed_packages_pr.js
  and exists to simply return with a non-zero exit code if none of the packages that have changed
  are an editor package. We use this to avoid running BS tests when no editor packages have changed.

  usage: ./exit.if.no.editor.packages.changed.js && exit 0
  */

// returns whether a package directory exists
function packageExists(packageName) {
  const dirName = packageName.replace('@atlaskit/', '');
  return fs.existsSync(path.join(process.cwd(), 'packages', dirName));
}

console.log(chalk.green('Checking if any editor packages have been changed'));

// This provides an escape hatch to force BS tests to run (i.e manually running BS tests)
if (process.env.FORCE_BS_TESTS) {
  console.log(chalk.green('FORCE_BS_TESTS var found, running Browser Stack tests'));
  process.exit(1);
}

exec('git fetch origin')
.then(() => exec('git diff --name-only master...'))
.then((result) => {
  const changedFiles = result.stdout.split('\n');
  const changedEditorPackages = changedFilesToChangedPackages(changedFiles)
  // to avoid a bug when deleting a package
  .filter(packageExists)
  .filter(pkgName => pkgName.startsWith('@atlaskit/editor'));
  if (changedEditorPackages.length !== 0) {
    console.log(chalk.green(`The following editor packages have changed ${changedEditorPackages.join(', ')}`));
    process.exit(1);
  }
  console.log(chalk.green('No editor packages have changed'));
  process.exit(0);
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
