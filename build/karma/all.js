const path = require('path');
const karmaConf = require('./base.js');


const file = path.join(__dirname, 'all.entry.js');

module.exports = (config) => {
  Object.assign(config, {
    files: [file],
    preprocessors: {
      [file]: ['webpack', 'sourcemap'],
    },
  });
  karmaConf(config);
};
