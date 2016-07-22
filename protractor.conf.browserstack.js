const protractorConf = require('./protractor.conf.js');

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
    'browserstack.debug': 'true',
    'browserstack.local': 'true',
  },
});

exports.config = protractorConf;
