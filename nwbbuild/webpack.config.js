const createWebpackConfig = require('@treshugart/nwb/lib/createWebpackConfig').default;
const getPluginConfig = require('@treshugart/nwb/lib/getPluginConfig');
const getUserConfig = require('@treshugart/nwb/lib/getUserConfig').default;

const userConfig = getUserConfig();
const pluginConfig = getPluginConfig();
const webpackConfig = createWebpackConfig({}, pluginConfig, userConfig);

module.exports = webpackConfig;
