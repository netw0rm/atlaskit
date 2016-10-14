const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');


chai.use(chaiAsPromised);
const expect = chai.expect; // eslint-disable-line no-unused-vars

module.exports = function steps() {
  this.When(
    /^I click the "([^"]*)" component$/,
    name => element(by.webComponentNamePrefix(name)).click()
  );
};
