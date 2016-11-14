const webpackConfig = require('../webpack/development.js');

module.exports = (storybookBaseConfig, configType) => { // eslint-disable-line no-unused-vars
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.devtool = webpackConfig.devtool;
  storybookBaseConfig.plugins = storybookBaseConfig.plugins.concat(webpackConfig.plugins);
  storybookBaseConfig.module.loaders = webpackConfig.module.loaders;
  storybookBaseConfig.postcss = webpackConfig.postcss;

  storybookBaseConfig.resolve = Object.assign(
    storybookBaseConfig.resolve || {},
    webpackConfig.resolve || {}
  );

  // Return the altered config
  return storybookBaseConfig;
};
