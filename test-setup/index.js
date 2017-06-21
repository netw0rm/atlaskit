require('./lessLoaderProxy');
require('jsdom-global')();
require('babel-register')({
  retainLines: true,

  // don't transpile files that don't end in .js or .jsx OR files within node_modules
  ignore(file) {
    return /node_modules/.test(file) || !/\.js(x)?$/.test(file);
  },

});

require('ts-node').register({
  project: require.resolve('../build/types/tsconfig.base.json'),
  // disableWarnings: true, // magic to stop typesript erroring
});

// Stubbing of requestAnimationFrame and cancelAnimationFrame
require('raf-stub').replaceRaf([window, global]);

const chai = require('chai');

global.expect = chai.expect;
