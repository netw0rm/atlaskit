const glob = require('glob');

module.exports = function noop() {};
module.exports.pitch = function pitch() {
  // Since we no longer support building storybooks with from multiple packages, we can safely use
  // the current working directory to find which stories to fetch without loading them all
  const packagesRoot = process.cwd();
  const storiesPattern = `${packagesRoot}/stories/**/*-story.{j,t}s*(x)`;
  const storybookFiles = glob.sync(storiesPattern, { cwd: __dirname });

  console.log(`Loading ${storybookFiles.length} storybook files`);

  const storyRequireStatements = storybookFiles
      .map(storyPath => `require(${JSON.stringify(storyPath)});`)
      .join('\n');

  return storyRequireStatements;
};
