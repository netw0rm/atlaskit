const path = require('path');
const lerna = require('lerna');
const lernaPackageUtilities = require('lerna/lib/PackageUtilities');
const getPackagesPath = require('./getPackagesPath.js');

/**
* Filters packages by their name based on the given glob and then gets the folder name
*
* @param {String} [packageGlob] The glob to match the package names against.
*                               Falsy value means no packages are matched.
* @return {Array} An array of folder names (the basename of the package folder beneath ../packages).
*                 Empty array if none matched.
*/
module.exports = function getPackageRestrictions(packageGlob) {
  if (packageGlob) {
    const packages = lernaPackageUtilities
      .filterPackages(lerna.getPackages(getPackagesPath()), packageGlob);
    return packages.map((p) => path.basename(p.location));
  }

  return [];
};
