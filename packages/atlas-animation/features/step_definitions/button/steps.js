const support = require('../support');

module.exports = function steps() {
  this.Given(/^I am on the integration page$/, function given() {
    return support.get(this, 'http://dev:8080');
  });

  this.Then(/^I should see a "([^"]*)" button$/, function then(text) {
    return support.isButtonPresent(this, text);
  });

  this.When(/^I click the "([^"]*)" button$/, function when(buttonText) {
    return support.getButtonByText(this, buttonText).click();
  });

  this.Then(/^I should not see the "([^"]*)" button$/, function then(buttonText) {
    return support.isButtonPresent(this, buttonText).then((result) => {
      if (result !== false) {
        throw new Error('should not be visible');
      }
    });
  });
};
