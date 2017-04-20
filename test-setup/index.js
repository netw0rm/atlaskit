require('./lessLoaderProxy');
require('jsdom-global')();
require('babel-register')({
  retainLines: true,
});

const chai = require('chai');

global.expect = chai.expect;
