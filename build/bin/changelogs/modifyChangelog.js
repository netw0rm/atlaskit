const transformCommitMessage = require('./transformCommitMessage');
const semver = require('semver');

// Called per changelog with the old and new information
const modifyChangelog = (currentVersion, releaseDetails, oldChangelog) => {
  const nextVersion = semver.inc(currentVersion, releaseDetails.type);
  const transformedCommitMessages = releaseDetails.commits.map(transformCommitMessage).join('\n');
  const changes = `\n\n## ${nextVersion} (${new Date().toISOString().slice(0, 10)})\n\n${transformedCommitMessages}`;
  return oldChangelog.replace('\n', changes).replace('\n## Unreleased', '');
};

module.exports = modifyChangelog;
