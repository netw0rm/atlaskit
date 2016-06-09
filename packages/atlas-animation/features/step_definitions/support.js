function Support() {}

Support.prototype.get = (sut, url) => {
  const browser = sut.browser;
  browser.ignoreSynchronization = true;
  return browser.get(url);
};

Support.prototype.getButtonByText = (sut, find) =>
  sut.browser.findElement(sut.by.buttonText(find));

Support.prototype.isButtonPresent = (sut, find) =>
  sut.browser.isElementPresent(sut.by.buttonText(find));

module.exports = new Support();
