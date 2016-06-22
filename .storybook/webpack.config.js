const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  storybookBaseConfig.plugins.push(new webpack.DefinePlugin({
      PACKAGE: JSON.stringify(process.env.PACKAGE),
  }));

  console.log(JSON.stringify(storybookBaseConfig.module.loaders));

  storybookBaseConfig.module.loaders = webpackConfig.module.loaders;

  console.log(JSON.stringify(storybookBaseConfig.module.loaders));

  // Return the altered config
  return storybookBaseConfig;
};
