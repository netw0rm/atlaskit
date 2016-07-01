const fs = require('fs');
const path = require('path');

module.exports = function () {}
module.exports.pitch = function (request) {
  const subdir = 'icons'
  return fs.readdirSync(path.join(__dirname, subdir))
    .filter(filename => filename.endsWith('.svg'))
    .map(filename => {
      const name = path.basename(filename, '.svg');
      return `exports[${JSON.stringify(name)}] = require("idomizer/lib/plugins/idomizer-loader!./${subdir}/${filename}");`
    })
    .join('\n');
}
