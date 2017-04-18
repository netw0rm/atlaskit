const path = require('path');
const jest = require('jest');

// TODO: first, we need to have build all the other packages e.g. `lerna run prepublish`
//   (but that bumps all the versions of things :-/)

// create the Jest configuration
const config = {

  // just one package for now -
  rootDir: path.resolve('./packages/media-card'),

  // look for all js(x)/ts(x) files in `./packages/media-card/**`
  // TODO: probably want to limit this a bit more - discuss
  testRegex: '\\.test\\.(jsx?|tsx?)$',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  transform: {

    // TODO: transpile JavaScript

    // compile Typescript
    '^.+\\.(tsx?)$': path.resolve(__dirname, './transform-typescript.js'),

  },

  // only collect coverage from source files (don't collect coverage stats for test files)
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],

};

// get the extra args to allow the user to pass additional Jest CLI options e.g. --watch --coverage
const args = process.argv;
args.shift(); // ignore the node cmd
args.shift(); // ignore the script cmd

// run Jest with the config and any additional args
jest.run(['--config', JSON.stringify(config)].concat(args));
