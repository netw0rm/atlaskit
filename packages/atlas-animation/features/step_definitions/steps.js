const pc = require('protractor-cucumber');

module.exports = function steps() {
  const seleniumAddress = 'http://hub:4444/wd/hub';
  const options = {
    browser: 'chrome',
    timeout: 100000,
  };
  this.World = pc.world(seleniumAddress, options);

  this.After(function afterTest(scenario, callback) {
    this.quit(callback);
  });
};
