const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

module.exports = function steps() {
  this.Then(/^I should see a "([^"]*)" component$/, (name) => {
    return browser.isElementPresent(by.webComponentNamePrefix(name));
  });

  this.When(/^I click the "([^"]*)" component$/, (name) => {
    return element(by.webComponentNamePrefix(name)).click();
  });

  this.Then(/^I should not see the "([^"]*)" component$/, (name, next) => {
    expect(browser.isElementPresent(by.webComponentNamePrefix(name)))
      .to.eventually.equal(false)
      .and.notify(next);
  });
};
