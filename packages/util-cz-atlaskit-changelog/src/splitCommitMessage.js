const path = require('path');

const getPackageNames = string => string.split(', ')
.map(t => t.split('@atlaskit/').filter(a => (a && a !== 'affects: ')))
.reduce((a, b) => a.concat(b), []);

const createPaths = packageName => getPackageNames(packageName)
// We can assume that we are in the correct directory when running this script.
.map(t => path.join(process.cwd(), `./packages/${t}/docs/`));

const getChangeType = (text) => {
  if (text.includes('BREAKING CHANGE:')) return 'breaking';
  if (text.includes('feat(')) return 'feature';
  if (text.includes('fix(')) return 'bug fix';
  return null;
};

// All the splitting text we are doing is busywork from setup
const splitCommitMessage = (commitMessage) => {
  // Only changes that cause releases will be added to changelog
  const changeType = getChangeType(commitMessage);
  if (!changeType) return null;

  const parts = commitMessage.split(/\n/);
  // We know that the array will need at least three items, so we escape if this
  // expectation is not met. The third line is always the affected packages.
  if (!parts[2]) return null;
  // Breaking changes are denoted by a line of "BREAKING CHANGE:" then the actual change on the next
  // lines.
  const breakingIndex = parts.indexOf('BREAKING CHANGE:');

  const issuesClosed = parts.find(e => e.includes('ISSUES CLOSED: '))
    ? ` (${parts.find(e => e.includes('ISSUES CLOSED: ')).toLowerCase()})`
    : '';

  // The information about a breaking change is provided on the next line
  const breakingChange = breakingIndex >= 0 ? `* ${changeType}; ${parts[breakingIndex + 1]}\n` : '';
  const change = `* ${changeType}; ${parts[0].replace(/^.*?: /, '')}${issuesClosed}\n`;
  const dirPaths = createPaths(parts[2]);
  return {
    dirPaths,
    packageNames: getPackageNames(parts[2]),
    readmePaths: dirPaths.map(p => `${p}CHANGELOG.md`),
    text: breakingChange + change,
  };
};

module.exports = splitCommitMessage;
