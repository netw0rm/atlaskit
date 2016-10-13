const constructStorybookUrl = require('./constructStorybookUrl.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

module.exports = function steps() {
  this.Given(
    /^I am on the story page "([^"]*)" of "([^"]*)"$/,
    { timeout: 60 * 1000 },
    (storyName, kind) => {
      const url = constructStorybookUrl(kind, storyName);
      browser.manage().timeouts().pageLoadTimeout(60 * 1000);
      return browser.get(url);
    });

  this.Then(/^I should see a "([^"]*)" component$/, (name, next) => {
    expect(
      browser.isElementPresent(by.webComponentNamePrefix(name)),
      `expected ${name} component to be visible but not`
    )
      .to.eventually.equal(true)
      .and.notify(next)
  });

  this.Then(/^I should not see a "([^"]*)" component$/, (name, next) => {
    expect(
      browser.isElementPresent(by.webComponentNamePrefix(name)),
      `expected ${name} component not to be visible but is present`
    )
      .to.eventually.equal(false)
      .and.notify(next);
  });
};
