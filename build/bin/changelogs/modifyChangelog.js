const transformCommitMessage = require('./transformCommitMessage');
const getNextVersion = require('./getNextVersion');

const transformCommitMessages = commits => commits.map(commit => transformCommitMessage(commit)).join('\n');

// Called per changelog with the old and new information
const modifyChangelog = (currentVersion, releaseDetails, oldChangelog) => {
  const nextVersion = getNextVersion(currentVersion, releaseDetails.type);
  const transformedCommitMessages = transformCommitMessages(releaseDetails.commits);
  const changes = `\n\n## ${nextVersion} (${new Date().toISOString().slice(0, 10)})\n\n${transformedCommitMessages}`;
  return oldChangelog.replace('\n', changes).replace('\n## Unreleased', '');
};

module.exports = modifyChangelog;
