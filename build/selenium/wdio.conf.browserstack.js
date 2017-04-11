const common = require('./wdio.conf.common');

exports.config = Object.assign({}, common.config, { // eslint-disable-line
  services: ['browserstack'],
  browserstackLocal: true,
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_KEY,

  maxInstances: 5,
  capabilities: [
    {
      browserName: 'firefox',
      'browserstack.local': true,
    },
    {
      browserName: 'chrome',
      'browserstack.local': true,
    },
    {
      os: 'Windows',
      os_version: '8.1',
      browser: 'IE',
      browser_version: '11.0',
      'browserstack.local': true,
    },
    {
      os: 'Windows',
      os_version: '10',
      browser: 'Edge',
      browser_version: '14.0',
      'browserstack.local': true,
    } // eslint-disable-line
  ],

  reporters: ['spec', 'allure'],
});
