const parseCommitMessage = require('./parseCommitMessage');
const getNextVersion = require('./getNextVersion');

const parseCommitMessages = commits => commits.map(commit => parseCommitMessage(commit)).join('\n');

const modifyChangelog = (version, type, oldChangelog) => {
  const nextVersion = getNextVersion(version, type.type);
  const releaseMessages = parseCommitMessages(type.commits);
  const changes = `\n\n## ${nextVersion} (${new Date().toISOString().slice(0, 10)})\n\n${releaseMessages}`;
  return oldChangelog.replace('\n', changes).replace('\n## Unreleased', '');
};

module.exports = modifyChangelog;
