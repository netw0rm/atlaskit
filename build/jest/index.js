const path = require('path');
const jest = require('jest');

// take the first argument as the target package, if it does not start with a `-`
let targetPackage = null;
let extraArgs = null;
if (process.argv[2] && !process.argv[2].startsWith('-')) {
  targetPackage = process.argv[2];
  extraArgs = process.argv.slice(3);
} else {
  extraArgs = process.argv.slice(2);
}

const testMatchSuffix = 'test/jest/**/*.(js|jsx|ts|tsx)';

const jestConfig = {

  setupFiles: [
    require.resolve('./setup.js'),
  ],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

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
    __TS_CONFIG__: require.resolve('../types/tsconfig.base.json'),

    'ts-jest': {

      // we can safely disable babel for perf improvements since we don't use synthetic imports
      // @see https://github.com/kulshekhar/ts-jest#supports-synthetic-modules
      skipBabel: true,

    },
  },

};

// limit the rootDir to save the fs/watcher some work
if (targetPackage) {
  jestConfig.rootDir = path.resolve(`packages/${targetPackage}`);
  jestConfig.testMatch = [`**/${testMatchSuffix}`];
} else {
  jestConfig.rootDir = path.resolve('packages');
  jestConfig.testMatch = [`**/packages/*/${testMatchSuffix}`];
}

jest.run([
  ...extraArgs,
  '--config', JSON.stringify(jestConfig),
]);
