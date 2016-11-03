const fs = require('fs');
const path = require('path');

module.exports = function noop() {};
module.exports.pitch = function pitch() {
  const subdir = 'icons';
  return fs.readdirSync(path.join(__dirname, subdir))
    .filter(filename => filename.endsWith('.svg'))
    .map((filename) => {
      const name = path.basename(filename, '.svg');
      const loader = 'idomizer/lib/plugins/idomizer-loader';
      return `exports[${JSON.stringify(name)}] = require("${loader}!./${subdir}/${filename}");`;
    })
    .join('\n');
};
