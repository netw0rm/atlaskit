#!/usr/bin/env node

/*
    This script simply returns a non-zero exit code if the current branch name does not match a
    passed in regex pattern.
*/

if (process.argv.length < 3) {
  console.error('No PATTERN provided');
  console.error('USAGE: node exit.if.branch.name.not.matches.js "PATTERN" || exit');
}

const regexString = process.argv[2];
const regexToMatch = new RegExp(regexString);
const branchName = process.env.BITBUCKET_BRANCH;

if (regexToMatch.test(branchName)) {
  process.exit(0);
} else {
  console.error(`${branchName} does not match pattern ${regexString} - exiting`);
  process.exit(1);
}
