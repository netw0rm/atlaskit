#!/usr/bin/env bash
set -e

MAX_RETRIES=2
GITHEAD_SHORT=$BITBUCKET_COMMIT
CURRENT_BRANCH=$BITBUCKET_BRANCH
CHALK="`yarn bin`/chalk"

# $BRANCHES_ALLOWED_TO_RUN_BS is used to disable browserstack tests in CI
# It is an env var stored in pipelines (a js regex string)
$BASEDIR/exit.if.branch.name.not.matches.js "$BRANCHES_ALLOWED_TO_RUN_BS" || exit 0
  # Run the Browserstack tests
  echo
  $CHALK --no-stdin -t "{blue Running browserstack test with all stages}"
  echo
  GITHEAD_SHORT="$GITHEAD_SHORT" \
  CURRENT_BRANCH="$CURRENT_BRANCH" \
  retry \
  --retries=$MAX_RETRIES \
  -- \
  node --max-old-space-size=4096 node_modules/.bin/karma start \
  ./build/config/karma/config.js --browserstack
fi
