const getChangeType = (text) => {
  if (text.includes('BREAKING CHANGE:')) return 'breaking';
  if (text.includes('feat(')) return 'feature';
  if (text.includes('fix(')) return 'bug fix';
  return null;
};

const transformCommitMessage = (commit) => {
  // Only changes that cause releases will be added to changelog
  const changeType = getChangeType(commit.message);
  if (!changeType) return null;

  const parts = commit.message.split(/\n/);
  // We know that the array will need at least three items, so we escape if this
  // expectation is not met. The third line is always the affected packages.
  if (!parts[2]) return null;
  // Breaking changes are denoted by a line of "BREAKING CHANGE:" then the actual
  // change on the next lines.
  const breakingIndex = parts.indexOf('BREAKING CHANGE:');

  const issuesClosed = parts.find(e => e.includes('ISSUES CLOSED: '))
    ? ` (${parts.find(e => e.includes('ISSUES CLOSED: ')).toLowerCase()})`
    : '';

  const shortHash = commit.hash.substring(0, 7);
  const link = `([${shortHash}](https://bitbucket.org/atlassian/atlaskit/commits/${shortHash}))`;

  // The information about a breaking change is provided on the next line
  const breakingChange = breakingIndex >= 0 ? `* ${changeType}; ${parts[breakingIndex + 1]} ${link}` : '';
  const change = `* ${changeType}; ${parts[0].replace(/^.*?: /, '')}${issuesClosed} ${link}`;
  return breakingChange ? `${breakingChange}\n${change}` : change;
};

module.exports = transformCommitMessage;
