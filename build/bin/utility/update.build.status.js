const chalk = require('chalk');
// We user npm-run instead of child-process because the binary is installed globally, not locally
const npmRun = require('npm-run');

function updateBuildStatus(buildKeyPrefix, buildName, description, state, url) {
  const commit = process.env.BITBUCKET_COMMIT;

  if (commit) {
    const repoSlug = process.env.BITBUCKET_REPO_SLUG;
    const repoOwner = process.env.BITBUCKET_REPO_OWNER;
    const bbUser = process.env.BITBUCKET_USER;
    const bbPassword = process.env.BITBUCKET_PASSWORD;

    const commitShort = commit.slice(0, 7);
    const buildKey = `${buildKeyPrefix}-${commitShort}`;

    console.log(chalk.blue(`Posting build status: "${state}"`));

    npmRun.spawn('bbuild',
      ['--commit', commit,
        '--repo', repoSlug,
        '--owner', repoOwner,
        '--username', bbUser,
        '--password', bbPassword,
        '--key', buildKey,
        '--name', buildName,
        '--description', description,
        '--url', url,
        '--state', state,
      ],
      { stdio: 'inherit' }
    ).on('exit', process.exit);
  }
}

module.exports = updateBuildStatus;
