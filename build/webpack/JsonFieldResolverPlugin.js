const fs = require('fs');
const webpack = require('webpack');

/**
 * A wrapper for a resolver plugin, to prevent it from being applied to paths matching
 * a specified regex.
 *
 * For example we may want to use the `DirectoryDescriptionFilePlugin` resolver plugin
 * to include `ak:webpack:raw`, but *not* for packages under a `node_modules`.
 *
 * Example:
 *
 *     new webpack.ResolverPlugin([
 *       new JsonFieldResolverPlugin({
 *         filename: 'package.json',
 *         mainFields: ['ak:webpack:raw'],
 *         exclude: /\/node_modules\//,
 *       }),
 *     ], ['normal']),
 *
 */
class JsonFieldResolverPlugin {
  constructor(options) {
    this.filename = options.filename;
    this.exclude = options.exclude;
    this.plugin = new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
      options.filename, options.fields);
  }

  apply(resolver) {
    // Call the underlying plugin, but pass in our own resolver to intercept and filter requests.
    const { plugin, exclude, filename } = this;
    plugin.apply({
      plugin(name, handler) {
        if (name === 'directory') {
          resolver.plugin('directory', function filter(request, callback) {
            const jsonPath = this.join(this.join(request.path, request.request), filename);
            // Resolve symlinks (required to support lerna linking).
            fs.realpath(jsonPath, (err, realpath) => {
              if (err || realpath.match(exclude)) {
                callback();
              } else {
                handler.call(this, request, callback);
              }
            });
          });
        }
      },
    });
  }
}

exports.JsonFieldResolverPlugin = JsonFieldResolverPlugin;
