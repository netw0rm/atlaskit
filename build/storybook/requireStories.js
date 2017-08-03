const glob = require('glob');

module.exports = function noop() {};
module.exports.pitch = function pitch() {
  // Since we no longer support building storybooks with from multiple packages, we can safely use
  // the current working directory to find which stories to fetch without loading them all

  // This is a temp fix for storybooks. If we are running static builds we'll have the PACKAGE var
  // and we need to work from within that package. Otherwise we are running the server and we know
  // we are inside the packages directory already
  const packagesRoot = process.env.PACKAGE ?
    `${__dirname}/../../packages/${process.env.PACKAGE}` :
    process.cwd();
  const storiesPattern = `${packagesRoot}/stories/**/*-story.{j,t}s*(x)`;
  const storybookFiles = glob.sync(storiesPattern, { cwd: __dirname });

  console.log(`Loading ${storybookFiles.length} storybook files`);

  const storyRequireStatements = storybookFiles
      .map(storyPath => `require(${JSON.stringify(storyPath)});`)
      .join('\n');

  return storyRequireStatements;
};
