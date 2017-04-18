const path = require('path');
const jest = require('jest');

// TODO: first, we need to have build all the other packages e.g. `lerna run prepublish`
//   (but that bumps all the versions of things :-/)

// TODO: change this to the package name to run tests on a single package
const singlePackage = false; // 'media-card';

// create the Jest configuration
const config = {

  rootDir: path.resolve('.'),

  // look for all js(x)/ts(x) files in `./packages/*/src/**`
  // TODO: probably want to limit this a bit more - discuss
  testRegex: `packages\\/${singlePackage ? `${singlePackage}\\/(.*)` : '(.*)'}\\.test\\.(jsx?|tsx?)$`,

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  transform: {

    // transpile JavaScript
    '^.+\\.(jsx?)$': path.resolve(__dirname, './transform-javascript.js'),

    // compile Typescript
    '^.+\\.(tsx?)$': path.resolve(__dirname, './transform-typescript.js'),

  },

  // only collect coverage from source files (don't collect coverage stats for test files)
  collectCoverageFrom: [`packages/${singlePackage || '*'}/src/**/*.{js,jsx,ts,tsx}`],
  coveragePathIgnorePatterns: ['\\/node_modules\\/', '\\.d\\.tsx?'],

};

// get the extra args to allow the user to pass additional Jest CLI options e.g. --watch --coverage
const args = process.argv;
args.shift(); // ignore the node cmd
args.shift(); // ignore the script cmd

// run Jest with the config and any additional args
jest.run(['--config', JSON.stringify(config)].concat(args));
