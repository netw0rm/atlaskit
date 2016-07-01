module.exports = function steps() {
  this.Given(
    /^I am on the story page "([^"]*)" of "([^"]*)"$/,
    { timeout: 60 * 1000 },
    (storyName, kind) => {
      const eKind = encodeURIComponent(kind);
      const eStory = encodeURIComponent(storyName);
      const url = `/iframe.html?selectedKind=${eKind}&selectedStory=${eStory}&dataId=x`;
      browser.manage().timeouts().pageLoadTimeout(10000);
      return browser.get(url);
    });
};
