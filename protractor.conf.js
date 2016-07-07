const path = require('path');

const rq = [
  path.join(__dirname, 'packages', 'akutil-cucumber', 'src', '**', '*-steps.js'),
  path.join(process.cwd(), 'cucumber', 'stepDefinitions', '**', 'steps.js'),
];

function webComponentLocator(componentNamePrefix, parentElement) {
  const using = parentElement || document;
  const tagMatcher = new RegExp('^' + componentNamePrefix, 'i'); // eslint-disable-line

  return Array
    .from(using.querySelectorAll('*[defined]'))
    .filter((node) => tagMatcher.test(node.tagName));
}

const protractorConf = {
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

if (process.env.BROWSERSTACK) {
  Object.assign(protractorConf, {
    seleniumAddress: 'http://hub.browserstack.com/wd/hub',
    capabilities: {
      browserName: 'Chrome',
      os: 'OS X',
      os_version: 'El Capitan',
      resolution: '1024x768',

      build: `${process.env.PKG} Integration`,
      name: `${process.env.PKG} protractor tests`,

      'browserstack.user': process.env.BROWSERSTACK_USERNAME,
      'browserstack.key': process.env.BROWSERSTACK_KEY,
    },
  });
}

exports.config = protractorConf;
