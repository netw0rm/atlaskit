#!/usr/bin/env node
/* Writing this file in js to make it easier to read and maintain */

// child_process_promise is a wrapper around nodes child_process'
const exec = require('child-process-promise').exec;

// returns a random 5 character string for use in branch names to avoid collisions (super unlikely)
function generateRandomString() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return [...new Array(5)]
    .map(() => alphabet.charAt(Math.random() * alphabet.length))
    .join('');
}

/*
  Gets a list of changed packages between current branch and master and returns them in the form
     @atlaskit/package1,@atlaskit/package2
   etc.
*/
function getChangedPackages() {
  exec('git fetch origin')
    .then(() => {
      const tempBranchName = `temp_${generateRandomString()}`;
      return exec(`git checkout -b ${tempBranchName}`);
    })
    .then(() => exec('git merge origin/master'))
    .then(() => exec('git diff --name-only origin/master'))
    .then((result) => {
      const stdout = result.stdout;
      const changedPackages = stdout.split('\n')
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

      // return the result
      console.log(`${changedPackages.join(',')}`); // eslint-disable-line no-console

      return exec('git checkout -');
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
    });
}

getChangedPackages();

