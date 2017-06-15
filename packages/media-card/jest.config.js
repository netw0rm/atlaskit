module.exports = {

  testMatch: [
    '**/test/**/*Spec.(ts|tsx|js)',
  ],

  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],

  transform: {
    '\\.(tsx?)$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },

  // let Jest transform Typescript files inside ./node_modules/@atlaskit/* since our packages are
  // only built on CI (if we changed this this it would dramatically increase the speed of our test
  // runs, to roughly 1/2 => ~10s)
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@atlaskit)'],

  globals: {
    'ts-jest': {
      // we can safely disable babel for perf improvements since we don't use synthetic imports
      // @see https://github.com/kulshekhar/ts-jest#supports-synthetic-modules
      skipBabel: true,
    },
  },

};
