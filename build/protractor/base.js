const path = require('path');
const webComponentLocator = require(
  path.join('akutil-common-test', 'src', 'index.locateWebComponent.js')
);

const rq = [
  require.resolve('akutil-cucumber'),
  path.join(process.cwd(), 'cucumber', 'step_definitions', '**', 'steps.js'),
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
  plugins: [
    {
      package: 'protractor-console',
      logLevels: ['debug', 'info', 'warning', 'severe'],
    },
  ],

  onPrepare: () => {
    /* global browser: false */
    browser.ignoreSynchronization = true;

    /* global by: false */
    by.addLocator('webComponentNamePrefix', webComponentLocator);
  },
};
