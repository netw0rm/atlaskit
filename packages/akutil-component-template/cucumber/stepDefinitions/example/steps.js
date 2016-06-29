const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

module.exports = function steps() {
  this.Then(/^I should see a "([^"]*)" button$/, (text) =>
    browser.isElementPresent(by.buttonText(text)));

  this.When(/^I click the "([^"]*)" button$/, (text) => element(by.buttonText(text)).click());

  this.Then(/^I should not see the "([^"]*)" button$/, (text, next) => {
    expect(browser.isElementPresent(by.buttonText(text)))
      .to.eventually.equal(false)
      .and.notify(next);
  });
};
