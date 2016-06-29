const path = require('path');

const rq = [
  path.join(__dirname, 'packages', 'akutil-cucumber', 'src', '**', '*.js'),
  path.join(process.cwd(), 'cucumber', 'stepDefinitions', '**', 'steps.js'),
];

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
    require: rq,
    format: undefined,
    profile: false,
    'no-source': true,
  },
};
