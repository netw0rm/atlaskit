const path = require('path');

exports.config = {
  seleniumAddress: process.env.SELENIUM_ADDRESS,
  baseUrl: process.env.BASE_URL,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: path.join(process.cwd(), 'cucumber', '**', '*.feature'),
  capabilities: {
    browserName: 'chrome',
  },
  cucumberOpts: {
    require: path.join(process.cwd(), 'cucumber', 'stepDefinitions', '**', 'steps.js'),
    format: undefined,
    profile: false,
    'no-source': true,
  },
};
