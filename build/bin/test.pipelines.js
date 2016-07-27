#!/usr/bin/env node
const https = require('https');
const childProcess = require('child_process');
const log = require('minilog')('Pipelines');
require('minilog').enable();

function prExistsForBranch(prList, wantedBranch) {
  for (let i = 0; i < prList.length; i++) {
    const pr = prList[i];
    if (pr.source.branch.name === wantedBranch) return true;
  }
  return false;
}

https.get('https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit/pullrequests?state=OPEN&pagelen=50', (res) => {
  res.setEncoding('utf8');
  const body = [];
  res.on('data', chunk => body.push(chunk));
  res.on('end', () => {
    const prData = JSON.parse(body.join(''));
    const branchName = process.env.CURRENT_BRANCH;
    const prExists = prExistsForBranch(prData.values, branchName);
    const prCommand = 'npm run test/browserstack/ci';
    const branchCommand = 'npm run test/ci -- --browsers=Chrome';
    const testCmd = prExists ? prCommand : branchCommand;
    const existsWords = prExists ? 'exists' : 'does not exist';
    log.info(`PR ${existsWords} for this branch (${branchName}) - running '${testCmd}'`);
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
