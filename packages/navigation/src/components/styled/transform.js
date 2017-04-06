const path = require('path');

module.exports = function (fileInfo, api) {
  const fileName = path.basname(fileInfo.path).split('.')[0];
  const { jscodeshift } = api;
  return jscodeshift(fileInfo.source)
    .find(jscodeshift.ExportDefaultDeclaration)
    .replaceWith((nodePath) => {
      // get the underlying Node
      const { node } = nodePath;
      // change to our new prop
      node.property.name = 'getCircleArea';
      // replaceWith should return a Node, not a NodePath
      return node;
    })
    .toSource();
};
