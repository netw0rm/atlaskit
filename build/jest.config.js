module.exports = {
  rootDir: process.cwd(),
  testRegex: '/test/.*.(ts|tsx|js|tsx)$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': require.resolve('ts-jest/preprocessor'),
  },

  // let Jest transform Typescript files inside ./node_modules/@atlaskit/* since our packages are
  // only built on CI (if we changed this this it would dramatically increase the speed of our test
  // runs)
  transformIgnorePatterns: ['\\/node_modules\\/(?!@atlaskit)'],

  globals: {
    // tell `ts-jest` where to find the typescript config
    __TS_CONFIG__: require.resolve('../build/types/tsconfig.base.json'),

    'ts-jest': {
      // we can safely disable babel for perf improvements since we don't use synthetic imports
      // @see https://github.com/kulshekhar/ts-jest#supports-synthetic-modules
      skipBabel: true,
    },
  },
};