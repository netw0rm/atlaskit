const standardConfig = require('./development.js');
const { encode, decode } = require('./loader-chain');

// We delete the entry from the normal config and let karma insert it for us
delete standardConfig.entry;

const tsxLoader = decode(standardConfig.module.loaders[2][0].loader);
tsxLoader['babel-loader'].plugins = tsxLoader['babel-loader'].plugins || [];
tsxLoader['babel-loader'].plugins.push('rewire');

standardConfig.module.loaders[2][0].loader = encode(tsxLoader);

module.exports = standardConfig;
