module.exports = {
  rootDir: process.cwd(),

  testRegex: '\\/jest\\/unit\\/[^_].*\\.(j|t)sx?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest/preprocessor',
  },

  moduleNameMapper: {
    '\\.(less|css)$': 'identity-obj-proxy',
    '\\.svg$': `${process.cwd()}/../../test-setup/EmptyJsxMock.js`,
  },

  // let Jest transform Typescript files inside ./node_modules/@atlaskit/* since our packages are
  // only built on CI (if we changed this this it would dramatically increase the speed of our test
  // runs)
  transformIgnorePatterns: ['\\/node_modules\\/(?!@atlaskit)'],

  globals: {
    'ts-jest': {

      // we can safely disable babel for perf improvements since we don't use synthetic imports
      // @see https://github.com/kulshekhar/ts-jest#supports-synthetic-modules
      skipBabel: true,

    },
  },
};
