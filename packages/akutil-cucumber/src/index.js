module.exports = function steps() {
  this.Given(
    /^I am on the story page "([^"]*)" of "([^"]*)"$/,
    { timeout: 60 * 1000 },
    (storyName, kind) => {
      browser.ignoreSynchronization = true;
      const eKind = encodeURIComponent(kind);
      const eStory = encodeURIComponent(storyName);
      const url = `/?selectedKind=${eKind}&selectedStory=${eStory}&full=0&down=1&left=1`;
      return browser.get(url);
    });
};
