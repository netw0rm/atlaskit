#!/usr/bin/env node
/* Writing this file in js to make it easier to read and maintain */
const exec = require('child-process-promise').exec;

/*
  Gets a list of changed packages between current branch and master and returns them in the form
     @atlaskit/package1,@atlaskit/package2
   etc.
*/
function getChangedPackages() {
  let changedPackages;

  exec('git fetch origin')
    // we can fairly safely hard code the name here as we are never pushing back to origin
    .then(() => exec('git checkout -b temp-branch-for-merging-master-and-doing-diff'))
    .then(() => exec('git merge origin/master'))
    .then(() => exec('git diff --name-only origin/master'))
    .then((result) => {
      changedPackages = result.stdout.split('\n')
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

      return exec('git checkout -');
    })
    .then(() => {
      if (changedPackages.length > 1) {
        // if we have more than 1 package, we output in the form
        // "{@atlaskit/packageOne,@atlaskit/packageTwo}" (no quotes)
        // This creates a glob that can be passed to lerna to scope commands to those packages
        console.log(`{${changedPackages.join(',')}}`); // eslint-disable-line no-console
      } else {
        // otherwise we can just output the name (or an empty string) and the glob should work fine
        console.log(changedPackages); // eslint-disable-line no-console
      }
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      process.exit(1);
    });
}

getChangedPackages();
