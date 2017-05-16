const glob = require('glob');

module.exports = function noop() {};
module.exports.pitch = function pitch() {
  // Dynamically generate a module that requires each of the storybook stories
  // that we want to load.
  const packageNameGlob = process.env.PACKAGE || '*';
  const packagesRoot = `${__dirname}/../../packages`;
  const storiesPattern = `${packagesRoot}/${packageNameGlob}/stories/**/*-story.{j,t}s*(x)`;
  const storybookFiles = glob.sync(storiesPattern, { cwd: __dirname });

  console.log(`Loading ${storybookFiles.length} storybook files...`);

  const storyRequireStatements = storybookFiles
      .map(storyPath => `require(${JSON.stringify(storyPath)});`)
      .join('\n');

  return storyRequireStatements;
};
