const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.development.js');
const getPackageRestrictions = require('./getPackageRestrictions.js');

const assign = (...args) => Object.assign(...args);

module.exports = (storybookBaseConfig, configType) => { // eslint-disable-line no-unused-vars
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.plugins = storybookBaseConfig.plugins.concat(webpackConfig.plugins);

  const folders = getPackageRestrictions(process.env.PACKAGE);
  const isSingle = folders.length === 1;
  storybookBaseConfig.plugins.push(new webpack.DefinePlugin({
    IS_RUNNING_SINGLE_PACKAGE: isSingle,
    PACKAGE_FOLDERS: JSON.stringify(folders),
    PACKAGE_STORY_FOLDER: isSingle ? JSON.stringify(`../../packages/${folders[0]}/stories`) : null,
  }));

  storybookBaseConfig.module.loaders = webpackConfig.module.loaders;
  storybookBaseConfig.postcss = webpackConfig.postcss;

  storybookBaseConfig.resolve = assign(webpackConfig.resolve, storybookBaseConfig.resolve || {});

  // Return the altered config
  return storybookBaseConfig;
};
