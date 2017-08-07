/*
  This function is used to exit certain functions early based on variables (e.g. storybooks using
  BRANCHES_ALLOWED_TO_BUILD_STORYBOOKS or browserstsack using BRANCHES_ALLOWED_TO_RUN_BROWSERSTACK)
*/
function exitIfBranchNameMatches(regexString) {
  if (!regexString) {
    console.error('exitIfBranchNameMatches error: No regex string provided');
    process.exit(1);
  }
  const regexToMatch = new RegExp(regexString);
  const branchName = process.env.BITBUCKET_BRANCH;

  if (!regexToMatch.test(branchName)) {
    console.error(`${branchName} does not match pattern ${regexString} - exiting`);
    process.exit(1);
  }
}

module.exports = exitIfBranchNameMatches;
