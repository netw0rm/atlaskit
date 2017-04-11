const common = require('./wdio.conf.common');

exports.config = Object.assign({}, common.config, { // eslint-disable-line
  services: ['selenium-standalone'],

  baseUrl: 'http://localhost:9001',

  maxInstances: 2,
  capabilities: [{
    browserName: 'firefox',
  }, {
    browserName: 'chrome',
  }],

  before() {
    // Firefox hack, otherwise it doesn't update the dom from time to time
    browser.execute('window.focus();'); // eslint-disable-line
  },
});
