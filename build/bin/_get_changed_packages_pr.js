#!/usr/bin/env node
/* Writing this file in js to make it easier to read and maintain */
const exec = require('child-process-promise').exec;
const fs = require('fs');
const path = require('path');
const changedPackagesToLernaGlob = require('./_changed_packages_to_lerna_glob');
const changedFilesToChangedPackages = require('./_changed_files_to_changed_packages');

// returns whether a package directory exists
// packageName includes the '@atlassian/' scope at the beginning
function packageExists(packageName) {
  const dirName = packageName.replace('@atlaskit/', '');
  return fs.existsSync(path.join(process.cwd(), 'packages', dirName));
}

/*
  Gets a list of changed packages between current branch and master and returns them as a glob
  that lerna can use to select them. For multiple packages this will look like:
     "{@atlaskit/package1,@atlaskit/package2}"
  For a single package it will just be the packageName ("@atlaskit/package1")
  Where no package has been changed, a blank line is output.
*/
function getChangedPackages() {
  exec('git fetch origin')
    .then(() => exec('git diff --name-only origin/master...'))
    .then(result => {
      const changedFiles = result.stdout.split('\n');
      const changedPackages = changedFilesToChangedPackages(changedFiles)
        // need to filter out any packages that not longer exist (we've deleted a package)
        .filter(packageExists);
      const lernaGlob = changedPackagesToLernaGlob(changedPackages);
      if (lernaGlob.length !== 0) {
        console.log(lernaGlob);
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

getChangedPackages();
