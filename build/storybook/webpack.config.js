const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const getPackageRestrictions = require('./getPackageRestrictions.js');

module.exports = (storybookBaseConfig, configType) => { // eslint-disable-line no-unused-vars
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.plugins.push(new webpack.DefinePlugin({
    PACKAGE_FOLDERS: JSON.stringify(getPackageRestrictions(process.env.PACKAGE)),
  }));

  storybookBaseConfig.module.loaders = webpackConfig.module.loaders;

  // Return the altered config
  return storybookBaseConfig;
};
