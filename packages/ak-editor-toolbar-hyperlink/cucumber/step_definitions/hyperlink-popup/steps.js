const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect; // eslint-disable-line no-unused-vars

module.exports = function steps() {
  this.Then(
    /^I should see a "([^"]*)" component$/,
    (name) => {
      return element(by.tagName('body')).getAttribute('innerHTML')
        .then((html) => {
          console.log(html);
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          // console.log(by.tagName('body').getHTML());
          return browser.isElementPresent(by.webComponentNamePrefix(name));
        });
    }
  );

  this.When(
    /^I click the "([^"]*)" component$/,
    (name) => {
      return element(by.tagName('body')).getAttribute('innerHTML')
        .then((html) => {
          console.log(html);
          console.log('=============================================');
          // console.log(by.tagName('body').getHTML());
          return element(by.webComponentNamePrefix(name)).click();
        });
    }
  );

  this.When(
    /^I click outside$/,
    () => element(by.tagName('body')).click()
  );

  this.When(
    /^I register a "([^"]*)" eventListener on "([^"]*)"$/,
    (event, name) => {
      const cb = this[`${event}CallbackOn${name}`] = sinon.spy();

      element(by.css(name)).on(event, cb);
    }
  );

  this.When(
    /^I enter "([^"]*)" key on the "([^"]*)" component$/,
    (key, name) => element(by.webComponentNamePrefix(name)).sendKeys(protractor.Key[key])
  );

  this.When(
    /^I should receive a "([^"]*)" event on "([^"]*)"$/,
    (event, name) => {
      expect(this[`${event}CallbackOn${name}`]).to.have.been.callCount(1);
    }
  );

  this.When(
    /^I should not receive a "([^"]*)" event on "([^"]*)"$/,
    (event, name) => {
      expect(this[`${event}CallbackOn${name}`]).to.have.been.callCount(0);
    }
  );
};
