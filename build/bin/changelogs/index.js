#!/usr/bin/env node
const spawn = require('child_process').spawn;
/* eslint-disable no-console */
const findReleaseDetails = require('./findReleaseDetails');
const updateChangelog = require('./updateChangelog');

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

const getReleasePaths = relevantReleases => (
  relevantReleases.then(releases => releases.map(r => `${r.location}/docs/CHANGELOG.md`))
);

function markAllAsReleased() {
  const relevantReleases = findReleaseDetails()
    .then(releaseInfo => releaseInfo.filter(info => info.nextRelease.type.type));

  relevantReleases
    .then(releases => releases.map(updateChangelog))
    .then(() => getReleasePaths(relevantReleases))
    .then(pathNames => gitAddChangelogs(pathNames))
    .then(() => console.log('Completed Updating of readme files'))
    .catch(e => console.error('Error in changelog release process', e));
}

markAllAsReleased();
