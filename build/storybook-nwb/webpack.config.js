const createWebpackConfig = require('nwb/lib/createWebpackConfig').default;
const getPluginConfig = require('nwb/lib/getPluginConfig');
const getUserConfig = require('nwb/lib/getUserConfig').default;

const userConfig = getUserConfig();
const pluginConfig = getPluginConfig();
const webpackConfig = createWebpackConfig({}, pluginConfig, userConfig);

module.exports = webpackConfig;
