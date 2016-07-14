const https = require('https');
const childProcess = require('child_process');

function prExistsForBranch(prList, wantedBranch) {
  for (let i = 0; i < prList.length; i++) {
    const pr = prList[i];
    if (pr.source.branch.name === wantedBranch) return true;
  }
  return false;
}

https.get('https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit/pullrequests?state=OPEN', (res) => {
  res.setEncoding('utf8');
  res.on('data', (d) => {
    const prData = JSON.parse(d);
    const prExists = prExistsForBranch(prData.values, process.env.CURRENT_BRANCH);
    const testCmd = prExists ? 'npm run test/browserstack/ci' : 'npm test';
    childProcess.execSync(testCmd, {
      stdio: 'inherit',
      cwd: __dirname,
      env: process.env,
    });
    process.exit(0);
  });
}).on('error', () => {
  process.exit(1);
});
