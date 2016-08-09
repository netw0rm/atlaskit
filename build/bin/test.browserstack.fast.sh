#!/bin/sh
set -e

HEAD_SHA=$(git rev-parse HEAD | cut -c1-6)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

KARMA_CONF="karma.conf.browserstack.fast.js"

# Run the Browserstack tests 1 component at a time, temporarily ignore failures
HEAD_SHA=$HEAD_SHA CURRENT_BRANCH="$CURRENT_BRANCH-fast" BROWSERSTACK=1 karma start $KARMA_CONF --reporters=dots --no-auto-watch --single-run $@
