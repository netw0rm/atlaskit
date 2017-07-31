#!/usr/bin/env bash
set -e

MAX_RETRIES=2
GITHEAD_SHORT=$BITBUCKET_COMMIT
CURRENT_BRANCH=$BITBUCKET_BRANCH
CHALK="`yarn bin`/chalk"

# $RUN_BROWSERSTACK_IN_BRANCH is used to disable browserstack tests in CI without having to merge
# a build. We can set to "*" or empty to have it run always, or set to a specific branch to whitelist
# the attempted fixing branch
if [[ "$RUN_BROWSERSTACK_IN_BRANCH" = "*"  ||
      "$RUN_BROWSERSTACK_IN_BRANCH" = "$CURRENT_BRANCH" ||
      -z "$RUN_BROWSERSTACK_IN_BRANCH" ]] ; then
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
