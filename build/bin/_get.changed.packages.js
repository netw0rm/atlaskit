#!/usr/bin/env node
/* Writing this file in js to make it easier to read and maintain */

// child_process comes from node itself
const exec = require('child_process').exec;

/* Gets a list of changed packages between current branch and master and returns them in the form
     @atlaskit/package1,@atlaskit/package2
   etc.
*/
function getChangedPackages() {
  exec('git fetch origin && git diff --name-only origin/master', (err, stdout, stderr) => {
    if (!err) {
      const changedPackages = stdout.split('\n')
        // remove any empty strings
        .filter(filePath => filePath.length > 0)
        // remove files not in /packages
        .filter(filePath => filePath.match(/^packages\//))
        // get packageNames
        .map(filePath => filePath.match(/^packages\/(.+?)\//)[1])
        // remove duplicate names (if the first index of ourself isnt our idx, we arent unique)
        .filter((packageName, idx, arr) => arr.indexOf(packageName) === idx)
        // add the @atlaskit scope to them
        .map(packageName => `@atlaskit/${packageName}`);

      // return the result
      console.log(`${changedPackages.join(',')}`); // eslint-disable-line no-console
    } else {
      console.error(stderr); // eslint-disable-line no-console
    }
  });
}

getChangedPackages();
