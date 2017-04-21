const glob = require('glob');
const path = require('path');

const { tmpFolderName } = require('./constants');

const tempFolder = `../${tmpFolderName}/`;
const sourceFolder = path.join(__dirname, '..', 'src');

module.exports = () => {
  const filesToExport = glob.sync(`${tempFolder}**/*.jsx`, {
    cwd: sourceFolder,
  });
  return filesToExport;
};
