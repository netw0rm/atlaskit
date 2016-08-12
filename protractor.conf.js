const path = require('path');
const rq = [
  path.join(__dirname, 'packages', 'akutil-cucumber', 'src', '**', '*-steps.js'),
  path.join(process.cwd(), 'cucumber', 'step_definitions', '**', 'steps.js'),
];

function isCustomElement(node) {
  const ctor = node.constructor;
  return ctor !== HTMLElement && ctor !== HTMLUnknownElement;
}

function webComponentLocator(componentNamePrefix, parentElement) {
  const using = parentElement || document;
  const tagMatcher = new RegExp(`^${componentNamePrefix}`);
  return [].slice.call(using.querySelectorAll('*'))
    .filter(node => tagMatcher.test(node.tagName.toLowerCase()))
    .filter(isCustomElement);
}

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
