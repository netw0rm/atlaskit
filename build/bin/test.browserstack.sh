#!/usr/bin/env bash
set -e

MAX_RETRIES=2
GITHEAD_SHORT=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CHALK="`npm bin`/chalk"

# Run the Browserstack tests
for STAGE in 1 2 3
do
  $CHALK --no-stdin -t "{blue \nRunning browserstack test of stage $STAGE\n}"

  GITHEAD_SHORT="$GITHEAD_SHORT" \
  CURRENT_BRANCH="$CURRENT_BRANCH" \
  BROWSERSTACK_STAGE=$STAGE \
  retry \
  --retries=$MAX_RETRIES \
  -- \
  karma start \
  ./build/karma/browserstack.js
done
