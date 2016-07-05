const loaderUtils = require("loader-utils");

module.exports = function (source) {
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const url = loaderUtils.interpolateName(this, query.name, {
    context: this.context,
    content: source
  });
  // We want to emit each icon separately for code splitting, so that it can be
  // loaded separately by consumers via e.g. `require('editorkit-icons/bold')`.
  this.emitFile(url, source);
  return source;
};
