/* eslint-disable no-console, no-multi-spaces */
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

// So special lines: First line is commit message core
// `affects:` for line telling you which package you need to add this to
// It looks like extra lines are included here
// `BREAKING CHANGE` line following will have the details
// ISSUES   CLOSED: We could link the related issue but I'm voting now

const gitAddChangelog = pathName => (
  new Promise((resolve, reject) => {
    const spawned = spawn('git', ['add', pathName]);
    spawned.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  })
);

const gitAddChangelogs = pathNames => Promise.all(pathNames.map(gitAddChangelog));

const updateChangelog = (pathName, text) => {
  const currentReadMe = fs.readFileSync(pathName).toString();
  // find whether it has an unreleased section
  // Use better things, find Unreleased then split on the first * after it, if
  // not split on Unreleased
  let splitOn = '\n';
  const addBack = '## Unreleased\n\n';
  if (currentReadMe.indexOf('## Unreleased\n') > -1) {
    splitOn = '## Unreleased\n\n';
  }

  const newText = `${addBack}${text}`;
  const splitReadme = currentReadMe.split(splitOn);
  if (splitReadme.length > 2) throw new Error('Readme file was incorrectly formatted, and would be split too often.');
  const newReadme = splitReadme.length > 1 ? splitReadme.join(newText) : splitReadme[0] + newText;

  return new Promise((resolve, reject) => {
    fs.writeFile(pathName, newReadme, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
  // Find Unreleased or add it
  // Add text as dot point to at the top of unreleased notes OR make new dotpoint
  // at the top of notes
};

const createPaths = packageName => packageName.split(', ')
.map(t => t.split('@atlaskit/').filter(a => (a && a !== 'affects: ')))
.reduce((a, b) => a.concat(b), [])
// We can assume that we are in the correct directory when running this script.
.map(t => path.join(process.cwd(), `./packages/${t}/docs/CHANGELOG.md`));

const getChangeType = (text) => {
  if (text.includes('BREAKING CHANGE:')) return 'breaking';
  if (text.includes('fix(')) return 'bug fix';
  if (text.includes('feat(')) return 'feature';
  return null;
};
// All the splitting text we are doing is busywork from setup
const splitText = (someText) => {
  // Only changes that cause releases will be added to changelog
  const changeType = getChangeType(someText);
  if (!changeType) return null;

  const parts = someText.split(/\n/);
  if (!parts[2]) return null;
  const breakingChangeIndex = parts.indexOf('BREAKING CHANGE:');
  // const ici = parts.findIndex(e => e.includes('ISSUES CLOSED:'));
  const info = {
    summary: parts[0],
    readmePaths: createPaths(parts[2]),
  };

  // If there is an item here, additional context has been provided,
  // we want to continue until we hit the index of breaking change or ISSUES CLOSED
  // TODO: Come back to this.
  // if (parts[4])

  // The information about a breaking change is provided on the next line
  if (breakingChangeIndex >= 0) info.breakingChange = parts[breakingChangeIndex + 1];
  info.text = `${info.breakingChange ? `* ${changeType}; ${info.breakingChange}\n` : ''}* ${changeType}; ${info.summary}\n`;
  return info;
};

const updateChangelogs = (someText, commit) => {
  const readmeInfo = splitText(someText);
  if (!readmeInfo) {
    console.log('No Changelog was generated for this commit.');
    return commit(someText);
  }
  const updatedFiles = readmeInfo.readmePaths.map(pathName => (
    updateChangelog(pathName, readmeInfo.text)
  ));
  return Promise.all(updatedFiles)
    .then(() => gitAddChangelogs(readmeInfo.readmePaths))
    .then(() => commit(someText))
    .catch((e) => {
      console.log('failed to write changelog. Change description will need to be manually added.', e);
      return commit(someText);
    });
};

module.exports = updateChangelogs;
