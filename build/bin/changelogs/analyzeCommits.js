const commitAnalyzer = require('@semantic-release/commit-analyzer');
const helpers = require('lerna-semantic-release-analyze-commits');

const analyze = (_ref, cb) => {
  const pkg = _ref.pkg;
  const commits = _ref.commits;

  const relevantCommits = commits.filter(commit => (
    helpers.isRelevant(helpers.findAffectsLine(commit), pkg.name)
  ));

  commitAnalyzer({}, Object.assign(_ref, { commits: relevantCommits }), (err, type) => {
    cb(err, { type, commits: relevantCommits });
  });
};

module.exports = analyze;
