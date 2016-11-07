const glob = require('glob');
const path = require('path');

const { tmpFolderName } = require('./constants');

const tempFolder = `../src/${tmpFolderName}/`;
const sourceFolder = path.join(__dirname, '..', 'src');

module.exports = () => {
  const filesToExport = glob.sync(`${tempFolder}**/*.js`, {
    cwd: sourceFolder,
  });
  return filesToExport;
};
