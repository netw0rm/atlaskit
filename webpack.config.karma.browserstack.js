const config = require('./webpack.config.karma.js');

module.exports = (browserstackEntry) => {
  config.module.loaders.push({
    loader: 'babel-loader',
    test: browserstackEntry,
    query: {
      presets: [
        'es2015',
      ],
    },
  });

  return config;
};
