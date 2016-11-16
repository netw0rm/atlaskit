const karmaConf = require('./base.js');

const base = 'test';
const files = `${base}/**/*.+(js|ts|tsx)`;
const exclude = `${base}/_*.+(js|ts|tsx)`;

module.exports = (config) => {
  Object.assign(config, {
    exclude: [exclude],
    files: [files],
    preprocessors: {
      [files]: ['webpack', 'sourcemap'],
    },
  });
  karmaConf(config);
  config.singleRun = true;
};
