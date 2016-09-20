#!/usr/bin/env bash
set -e

MAX_RETRIES=2
HEAD_SHA=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Run the Browserstack tests
for STAGE in 1 2 3
do
  HEAD_SHA=$HEAD_SHA \
  CURRENT_BRANCH="$CURRENT_BRANCH" \
  STAGE=$STAGE \
  retry \
  --retries=$MAX_RETRIES \
  -- \
  karma start \
  ./build/karma/browserstack.js
done
