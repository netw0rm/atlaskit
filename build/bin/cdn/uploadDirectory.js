const childProcess = require('child_process');
const path = require('path');
/*
 * This is simply a wrapper script to allow the cdn_publish script to be called from js easily
 */

function uploadToCdn(srcFolder, targetPath) {
  const scriptToRun = path.join(__dirname, '..', 'cdn_publish_folder.sh');

  childProcess.spawn(scriptToRun, [srcFolder, targetPath], { stdio: 'inherit' });
}

module.exports = uploadToCdn;
