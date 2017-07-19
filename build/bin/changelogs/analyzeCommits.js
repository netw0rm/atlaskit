const commitAnalyzer = require('@semantic-release/commit-analyzer');
const helpers = require('lerna-semantic-release-analyze-commits');

const analyze = (_ref, cb) => {
  const relevantCommits = _ref.commits.filter(commit => (
    helpers.isRelevant(helpers.findAffectsLine(commit), _ref.pkg.name)
  ));

  commitAnalyzer({}, Object.assign(_ref, { commits: relevantCommits }), (err, type) => (
    cb(err, { type, commits: relevantCommits })
  ));
};

module.exports = analyze;
