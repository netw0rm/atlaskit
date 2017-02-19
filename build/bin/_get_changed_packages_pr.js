#!/usr/bin/env node
/* Writing this file in js to make it easier to read and maintain */
const exec = require('child-process-promise').exec;

// Takes an array of file names (with paths) and returns a list of packages that those files came
// from. i.e ['packages/foo/bar.js','packages/foo/xyz.js','packages/abc/something.js']
// would return ['@atlaskit/foo', '@atlaskit/abc']
function changedFilesToChangedPackages(changedFiles) {
  return changedFiles
    // remove any empty strings
    .filter(filePath => filePath.length > 0)
    // remove files not in /packages directory
    .filter(filePath => filePath.match(/^packages\//))
    // get packageNames from paths
    .map(filePath => filePath.match(/^packages\/(.+?)\//)[1])
    // remove duplicate names (if the first index of ourself isnt our idx, we arent unique)
    .filter((packageName, idx, arr) => arr.indexOf(packageName) === idx)
    // add the @atlaskit scope to them
    .map(packageName => `@atlaskit/${packageName}`);
}

// Takes an array of changed packages and outputs a glob that will select all those packages in
// lerna.
// if we have more than 1 package, we output in the form
//  "{@atlaskit/packageOne,@atlaskit/packageTwo}" (no quotes)
// if exactly one, we output just the name itself "@atlaskit/packageOne" (no quotes)
// otherwise
function changedPackagesToLernaGlob(changedPackages) {
  if (changedPackages.length > 1) {
    return `{${changedPackages.join(',')}}`;
  } else if (changedPackages.length === 1) {
    return changedPackages[0];
  }
  return '';
}

/*
  Gets a list of changed packages between current branch and master and returns them as a glob
  that lerna can use to select them. For multiple packages this will look like:
     "{@atlaskit/package1,@atlaskit/package2}"
  For a single package it will just be the packageName ("@atlaskit/package1")
  Where no package has been changed, a blank line is output.
*/
function getChangedPackages() {
  let changedPackages;

  exec('git fetch origin')
    // we can fairly safely hard code the name here as we are never pushing back to origin
    .then(() => exec('git checkout -b temp-branch-for-merging-master-and-doing-diff'))
    .then(() => exec('git merge origin/master'))
    .then(() => exec('git diff --name-only origin/master'))
    .then((result) => {
      const changedFiles = result.stdout.split('\n');
      changedPackages = changedFilesToChangedPackages(changedFiles);

      return exec('git checkout -');
    })
    .then(() => {
      console.log(changedPackagesToLernaGlob(changedPackages)); // eslint-disable-line no-console
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      process.exit(1);
    });
}

getChangedPackages();

module.exports = { changedFilesToChangedPackages, changedPackagesToLernaGlob };

