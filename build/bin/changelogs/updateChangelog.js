const parseCommitMessage = require('./parseCommitMessage');

const updateChangelog = releaseDetails => (
  releaseDetails.nextRelease.type.commits.map(commit => parseCommitMessage(commit.message)).join('\n')
);

module.exports = updateChangelog;
