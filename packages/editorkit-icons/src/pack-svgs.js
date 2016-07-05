const fs = require('fs');
const path = require('path');
const camelCase = require("lodash.camelcase");

module.exports = function () {}
module.exports.pitch = function (request) {
  const subdir = 'icons'
  return fs.readdirSync(path.join(__dirname, subdir))
    .filter(name => name.endsWith('.svg'))
    .map(name => {
      const camelName = camelCase(path.basename(name, '.svg'));
      return `exports.${camelName} = require("./pack-svg?name=dist/${camelName}.js!idomizer/lib/plugins/idomizer-loader!./${subdir}/${name}");`
    })
    .join('\n');
}
