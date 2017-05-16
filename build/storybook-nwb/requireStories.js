const glob = require('glob');

// We use this loader to dynamically load the storybook files only for the package we are in.
// We do this by analysing the package you call this script from

module.exports = function noop() {};
module.exports.pitch = function pitch() {
  // This script will be called from the root of a package
  const packageRoot = process.cwd();
  const storiesPattern = `${packageRoot}/stories/**/*-story.{j,t}s*(x)`;
  const storybookFiles = glob.sync(storiesPattern, { cwd: __dirname });

  console.log(`Loading ${storybookFiles.length} storybook files...`);

  const storyRequireStatements = storybookFiles
      .map(storyPath => `require(${JSON.stringify(storyPath)});`)
      .join('\n');

  return storyRequireStatements;
};
