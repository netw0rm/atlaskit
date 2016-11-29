const path = require('path');

const karmaConf = require('../base');
const assignPattern = require('../assignPattern');


module.exports = (config) => {
  karmaConf(config);
  assignPattern(config, path.join(__dirname, 'all.entry.js'));
  config.set({
    browsers: ['jsdom'],
  });

  // Following is copied from https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
  Object.assign(config.webpack, {
    devtool: 'inline-source-map', // just do inline source maps instead of the default
    externals: {
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
  });
};
