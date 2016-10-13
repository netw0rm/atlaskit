const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect; // eslint-disable-line no-unused-vars

module.exports = function steps() {
  this.When(
    /^I click the "([^"]*)" component$/,
    (name) => element(by.webComponentNamePrefix(name)).click()
  );

  this.When(
    /^I click outside$/,
    () => element(by.tagName('body')).click()
  );

  this.When(
    /^I enter "([^"]*)" key on the "([^"]*)" component$/,
    (key, name) => element(by.webComponentNamePrefix(name)).sendKeys(protractor.Key[key])
  );

  
  //TODO to be removed

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
