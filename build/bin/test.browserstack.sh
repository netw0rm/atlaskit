#!/usr/bin/env bash
set -e

HEAD_SHA=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Run the Browserstack tests
HEAD_SHA=$HEAD_SHA \
CURRENT_BRANCH="$CURRENT_BRANCH" \
retry \
--retries=2 \
-- \
karma start \
./build/karma/browserstack.js \
--single-run \
--reporters=mocha,junit
