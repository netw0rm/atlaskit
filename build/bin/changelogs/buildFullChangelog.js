const conventionalChangelog = require('conventional-changelog');
const tagging = require('lerna-semantic-release-utils').tagging;
const analyzer = require('lerna-semantic-release-analyze-commits');
const fs = require('fs');

function reformatCommit(commit) {
  if (commit.committerDate) {
    // While we get the date in an ISO format it includes a timestamp. Adding it
    // to date and then parsing it out again ensures it is in UTC.
    commit.committerDate = new Date(commit.committerDate).toISOString().substring(0, 10);
  }
  const isReleaseCommit = commit.type === 'chore' && commit.scope === 'release';
  // If it is not a release commit, we do not need any of the below information.
  if (!isReleaseCommit) return commit;

  const affectedPackages = analyzer.getAffectedPackages(
    analyzer.findAffectsLine({ message: commit.body })
  );
  const hasVersion = affectedPackages[0] &&
    tagging.getTagParts(affectedPackages[0]) &&
    tagging.getTagParts(affectedPackages[0]).version;

  if (!hasVersion) return commit;

  const newVersion = tagging.getTagParts(affectedPackages[0]).version;
  commit.version = newVersion;
  return commit;
}

function transformCommit(commit, name, cb) {
  const isRelevant = analyzer.isRelevant(analyzer.findAffectsLine({ message: commit.body }), name);
  if (!isRelevant) return cb(null, null);
  const newCommit = reformatCommit(commit);
  return cb(null, newCommit);
}

function reconfigureReadme(readmeFileData) {
  const lines = readmeFileData.split(/\n/);
  let currentType;

  const findType = (line) => {
    if (line.includes('### Features')) return '* feature;';
    if (line.includes('### Bug Fixes')) return '* fix;';
    if (line.includes('### BREAKING CHANGES')) return '* breaking;';
    return null;
  };

  return lines.reduce((acc, line, i, arr) => {
    if (line.match(/^### /)) {
      currentType = findType(line);
      return acc;
    }
    // This removes false changelog for any current changes not yet released
    if (line.match(/^## \[/)) return acc.concat('## Unreleased');
    if (line === '' && arr[i + 1] === '') return acc;
    if (line.match(/<a name=".*<\/a>/)) return acc;
    if (line.match(/\* \*\*/)) {
      const newLine = line.replace(/\* \*\*.*\*\*/, currentType);
      return acc.concat(newLine);
    }
    return acc.concat(line);
  }, []).join('\n');
}

function reformatDocs(changelogPath, pkgName, pkgPath, cb) {
  const docs = fs.readFileSync(`${pkgPath}/docs/CHANGELOG.md`);
  const newDocs = reconfigureReadme(`# ${pkgName}\n\n${docs}`);
  fs.writeFileSync(`${pkgPath}/docs/CHANGELOG.md`, newDocs);
  cb();
}

function testPackageSetup(location) {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line
      require(`${location}/package.json`);
    } catch (e) {
      reject('Unable to find the specified package in atlaskit');
    }
    try {
      fs.readFileSync(`${location}/docs/CHANGELOG.md`);
      reject('alreadyExists');
    } catch (e) {
      if (e.message === 'alreadyExists') reject('A static changelog already exists for this package. If you want to replace it, delete the file first.');
    }
    resolve();
  });
}

async function writePackageChangelog({ location, name }) {
  const changelogPath = `${location}/docs/CHANGELOG.md`;
  await testPackageSetup(location);

  const writeStream = fs.createWriteStream(changelogPath);

  conventionalChangelog({
    preset: 'angular',
    transform: (commit, cb) => transformCommit(commit, name, cb),
  }).pipe(writeStream);

  return new Promise((resolve) => {
    writeStream.on('close', () => reformatDocs(changelogPath, name, location, resolve));
  });
}

module.exports = writePackageChangelog;
