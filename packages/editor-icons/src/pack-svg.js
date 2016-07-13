const loaderUtils = require("loader-utils");
const path = require("path");

const transform = (source, name) => (
  source.replace('module.exports =', 'const idom =') + `
const skatejs = require("skatejs");
module.exports = skatejs.define('editor-icon-x-${name}', { render: idom(skatejs.vdom) });
`);

module.exports = function (source) {
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  const content = transform(source, path.basename(query.name, '.js'));
  const url = loaderUtils.interpolateName(this, query.name, {
    context: this.context,
    content: content
  });
  // We want to emit each icon separately for code splitting, so that it can be
  // loaded separately by consumers via e.g. `require('editor-icons/dist/bold')`.
  this.emitFile(url, content);
  return content;
};
