/*
  This file is executed after the test framework is setup for each test file. Addons that modify
  the `expect` object can be applied here.
  @see https://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string
*/
require('jest-styled-components');

if (!require.ensure) {
  Object.defineProperties(Object.getPrototypeOf(require), {
    ensure: {
      value: (deps, cb) => cb(require),
    },
  });
}
