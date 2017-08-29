#!/usr/bin/env bash
set -e

MAX_RETRIES=2
GITHEAD_SHORT=$BITBUCKET_COMMIT
CURRENT_BRANCH=$BITBUCKET_BRANCH
CHALK="`yarn bin`/chalk"

# This will exit with a non-zer0 code if we have edited an editor package, thus not hit the exit
# This will prevent us running BS for non-editor tests.
# You can also opt in to BS-tests by setting the FORCE_BS_TESTS env var to true
./build/bin/exit.if.no.editor.packages.changed.js && exit 0

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
