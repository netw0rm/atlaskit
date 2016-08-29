#!/usr/bin/env bash
set -e

HEAD_SHA=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
TRY=0

# Run the Browserstack tests
HEAD_SHA=$HEAD_SHA \
CURRENT_BRANCH="$CURRENT_BRANCH" \
retry \
--retries=2 \
-- \
TRY=$((TRY + 1)) \
echo "\033[34mTest run #${TRY}\033[0m" && \
karma start \
karma.conf.browserstack.js \
--single-run \
--reporters=mocha,junit
