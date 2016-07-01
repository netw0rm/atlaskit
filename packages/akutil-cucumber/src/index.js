const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

module.exports = function steps() {
  this.Given(
    /^I am on the story page "([^"]*)" of "([^"]*)"$/,
    { timeout: 60 * 1000 },
    (storyName, kind) => {
      const eKind = encodeURIComponent(kind);
      const eStory = encodeURIComponent(storyName);
      const url = `/iframe.html?selectedKind=${eKind}&selectedStory=${eStory}&dataId=x`;
      browser.manage().timeouts().pageLoadTimeout(60 * 1000);
      return browser.get(url);
    });

  this.Then(
    /^I should see a "([^"]*)" component$/,
    (name) => browser.isElementPresent(by.webComponentNamePrefix(name))
  );

  this.Then(/^I should not see a "([^"]*)" component$/, (name, next) => {
    expect(browser.isElementPresent(by.webComponentNamePrefix(name)))
      .to.eventually.equal(false)
      .and.notify(next);
  });
};
