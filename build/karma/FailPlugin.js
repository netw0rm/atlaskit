/**
 * A webpack plugin that fails Karma when a webpack compilation error occurs.
 * This is useful for 'failing' the build when webpack loaders that report
 * compilation errors but are unable themselves to hint to Karma that it should
 * fail.
 *
 * The plugin is only active when Karma's config has `singleRun=true`.
 */
class FailPlugin {
  constructor(karmaConfig) {
    this.karmaConfig = karmaConfig;
  }

  apply(compiler) {
    if (this.karmaConfig.singleRun) {
      compiler.plugin('done', (stats) => {
        if (stats.hasErrors()) {
          // eslint-disable-next-line no-restricted-syntax
          for (const error of stats.toJson({ errors: true }).errors) {
            // eslint-disable-next-line no-console
            console.error(`ERROR in ${error}\n`);
          }
          process.exit(1);
        }
      });
    }
  }
}

module.exports = FailPlugin;
