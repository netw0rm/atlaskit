const chai = require('chai');

const expect = chai.expect;
const constructStorybookUrl = require('./constructStorybookUrl.js');

module.exports = function steps() {
  this.Given(
    /^I am on the story page "([^"]*)" of "([^"]*)"$/,
    { timeout: 60 * 1000 },
    (storyName, kind) => {
      const url = constructStorybookUrl(kind, storyName);
      browser.manage().timeouts().pageLoadTimeout(60 * 1000);
      return browser.get(url);
    });

  this.Then(
    /^I should see a "([^"]*)" component$/,
    name => browser.isElementPresent(by.webComponentNamePrefix(name))
  );

  this.Then(/^I should not see a "([^"]*)" component$/, (name, next) => {
    expect(browser.isElementPresent(by.webComponentNamePrefix(name)))
      .to.eventually.equal(false)
      .and.notify(next);
  });
};
