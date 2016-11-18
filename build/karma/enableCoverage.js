module.exports = (config, subDir, babelQuery = {}) => {
  Object.assign(config, {
    browserNoActivityTimeout: 120000,
    coverageReporter: {
      type: 'html',
      dir: `coverage/${subDir}/`,
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text', subdir: '.', file: 'coverage.txt' },
      ],
    },
  });

  Object.assign(config.webpack, {
    isparta: {
      embedSource: true,
      noAutoWrap: true,
      // these babel options will be passed only to isparta and not to babel-loader
      babel: babelQuery,
    },
  });
  // transpile and instrument only testing sources with isparta
  config.webpack.module.preLoaders = [
    {
      // TODO make this work for Typescript when/if isparta/istanbul support it
      test: /\.(js)x?/,
      include: /packages\/.*?\/src/,
      exclude: [
        /node_modules/,
        /tmp/,
      ],
      loader: 'isparta',
    },
  ];
  config.reporters.push('coverage');
};
