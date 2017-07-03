const conventionalChangelog = require('conventional-changelog');
const tagging = require('lerna-semantic-release-utils').tagging;
const analyzer = require('lerna-semantic-release-analyze-commits');
const fs = require('fs');
const path = require('path');

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

function reformatDocs(changelogPath, pkgName, pkgPath) {
  const docs = fs.readFileSync(`${pkgPath}/docs/CHANGELOG.md`);
  const newDocs = `# ${pkgName}\n\n## Unreleased\n\n\n${docs}`;
  const mod1Docs = newDocs.split(/\n\n<a name=".*<\/a>\n/).join('');

  fs.writeFileSync(`${pkgPath}/docs/CHANGELOG.md`, mod1Docs);
}

function writePackageChangelog(pkgName) {
  const pkgPath = path.join(process.cwd(), `packages/${pkgName}`);
  const changelogPath = `${pkgPath}/docs/CHANGELOG.md`;
  let pkg;
  try {
    // eslint-disable-next-line
    pkg = require(`${pkgPath}/package.json`);
  } catch (e) {
    throw new Error('Unable to find the specified package in atlaskit');
  }
  try {
    pkg = fs.readFileSync(`${pkgPath}/docs/CHANGELOG.md`);
    throw new Error('alreadyExists');
  } catch (e) {
    if (e.message === 'alreadyExists') throw new Error('A static changelog already exists for this package. If you want to replace it, delete the file first.');
  }

  const writeStream = fs.createWriteStream(changelogPath);

  conventionalChangelog({
    preset: 'angular',
    transform: (commit, cb) => transformCommit(commit, pkg.name, cb),
  }).pipe(writeStream);

  writeStream.on('close', () => reformatDocs(changelogPath, pkg.name, pkgPath));
}

writePackageChangelog(process.argv[2]);
