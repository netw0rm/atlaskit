const path = require('path');
const fs = require('fs');
const glob = require('glob');

function writeEntryFile(name) {
  const entryFile = path.join(__dirname, name);
  const contents = glob
        .sync('./packages/*/test/**/*.js')
        .map((testFile) => `require('${testFile}');`)
        .join('\n');
  fs.writeFileSync(entryFile, contents);
  return entryFile;
}

module.exports = writeEntryFile;
