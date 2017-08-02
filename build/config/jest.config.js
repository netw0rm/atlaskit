const getConfigRoot = require('./_getConfigRoot');
const path = require('path');

const cwd = process.cwd();
const configRoot = getConfigRoot(cwd);
const repoRoot = path.join(cwd.split('packages')[0]);
const testSetupDir = path.join(repoRoot, 'test-setup');

let tsConfigFile;

if (configRoot.indexOf('packages') > 0) {
  tsConfigFile = path.join(cwd, 'tsconfig.json');
} else {
  tsConfigFile = path.join(cwd, 'build/types/tsconfig.base.json');
}

module.exports = {
  rootDir: cwd,

  testRegex: '\\/test\\/unit\\/[^_].*\\.(j|t)sx?$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFiles: [`${testSetupDir}/jestSetup.js`],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest/preprocessor',
  },

  moduleNameMapper: {
    '\\.(less|css)$': 'identity-obj-proxy',
    '\\.svg$': `${testSetupDir}/EmptyJsxMock.js`,
  },

  // let Jest transform Typescript files inside ./node_modules/@atlaskit/* since our packages are
  // only built on CI (if we changed this this it would dramatically increase the speed of our test
  // runs)
  transformIgnorePatterns: ['\\/node_modules\\/(?!@atlaskit)'],

  snapshotSerializers: ['enzyme-to-json/serializer'],

  globals: {
    'ts-jest': {
      tsConfigFile,
      // we can safely disable babel for perf improvements since we don't use synthetic imports
      // @see https://github.com/kulshekhar/ts-jest#supports-synthetic-modules
      skipBabel: true,
    },
  },
};
