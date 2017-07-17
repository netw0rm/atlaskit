/* eslint-disable no-console, no-multi-spaces */
const spawn = require('child_process').spawn;
const rewriteChangelog = require('./rewriteChangelog');
const splitCommitMessage = require('./splitCommitMessage');

const gitAddChangelogs = (pathNames) => {
  // we add all the changelogs in one `git add` command to prevent running multiple git operations
  // at once (very bad idea).
  console.log(`Adding changelogs to current commit by running \n\`git add ${pathNames.join(' ')}\``);

  return new Promise((resolve, reject) => {
    const spawned = spawn('git', ['add', ...pathNames]);
    spawned.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
};

const updateChangelogs = (commitMessage, commit) => {
  const readmeInfo = splitCommitMessage(commitMessage);
  if (!readmeInfo) {
    console.log('No Changelog was generated for this commit.');
    return commit(commitMessage);
  }
  const updatedFiles = readmeInfo.readmePaths.map((pathName, i) => (
    rewriteChangelog(pathName, readmeInfo.text, readmeInfo.dirPaths[i], readmeInfo.packageNames[i])
  ));
  return Promise.all(updatedFiles)
    .then(() => gitAddChangelogs(readmeInfo.readmePaths))
    .then(() => commit(commitMessage))
    .catch((e) => {
      console.log('failed to write changelog. Change description will need to be manually added.', e);
      return commit(commitMessage);
    });
};

module.exports = updateChangelogs;
