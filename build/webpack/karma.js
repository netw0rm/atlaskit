const standardConfig = require('./development.js');

// We delete the entry from the normal config and let karma insert it for us
delete standardConfig.entry;

standardConfig.module.postLoaders = [
  {
    test: /^((?!\.spec\.ts).)*.ts$/,
    exclude: /(node_modules|tests)/,
    loader: 'istanbul-instrumenter-loader', // used to to get the code coverage for TypeScript
  },
];

module.exports = standardConfig;
