const childProcess = require('child_process');
const path = require('path');
/*
 * This is simply a wrapper script to allow the cdn_publish script to be called from js easily
 * until it is replaced with something simpler
 */

function uploadToCdn(srcFolder, targetPath) {
  const scriptToRun = path.join(__dirname, '..', '_cdn_publish_folder.sh');

  const cmdResult = childProcess.spawnSync(scriptToRun, [srcFolder, targetPath], { stdio: 'inherit' });

  if (cmdResult.status !== 0) {
    console.error(cmdResult.stderr, cmdResult.error);
    process.exit(cmdResult.status);
  }
}

module.exports = uploadToCdn;
