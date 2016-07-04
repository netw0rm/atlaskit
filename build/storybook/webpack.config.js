const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const lerna = require('lerna');
const lernaPackageUtilities = require('lerna/lib/PackageUtilities');

/**
* Filters packages by their name based on the given glob and then gets the folder name
*
* @param {String} [packageGlob] The glob to match the package names against.
*                               Falsy value means no packages are matched.
* @return {Array} An array of folder names (the basename of the package folder beneath ../packages).
*                 Empty array if none matched.
*/
function getPackageRestrictions(packageGlob) {
  if (packageGlob) {
    const packagesPath = lerna.getPackagesPath(path.join(__dirname, '..', '..'));
    const packages = lernaPackageUtilities
      .filterPackages(lerna.getPackages(packagesPath), packageGlob);
    return packages.map((p) => path.basename(p.location));
  }

  return [];
}

module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.plugins.push(new webpack.DefinePlugin({
    PACKAGE_FOLDERS: JSON.stringify(getPackageRestrictions(process.env.PACKAGE)),
  }));

  storybookBaseConfig.module.loaders = webpackConfig.module.loaders;
  if (configType === 'DEVELOPMENT') {
    storybookBaseConfig.devtool = 'eval';
  }

  // Return the altered config
  return storybookBaseConfig;
};
