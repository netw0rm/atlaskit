const commitAnalyzer = require('@semantic-release/commit-analyzer');
const helpers = require('lerna-semantic-release-analyze-commits');

// This is taken from LSR, and is doing the same thing, however it also returns the commits
const analyze = (_ref, cb) => {
  const relevantCommits = _ref.commits.filter(commit => (
    helpers.isRelevant(helpers.findAffectsLine(commit), _ref.pkg.name)
  ));

  commitAnalyzer({}, Object.assign(_ref, { commits: relevantCommits }), (err, type) => (
    cb(err, { type, commits: relevantCommits })
  ));
};

module.exports = analyze;
