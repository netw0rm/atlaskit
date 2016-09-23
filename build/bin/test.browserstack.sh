#!/usr/bin/env bash
set -e

MAX_RETRIES=2
GITHEAD_SHORT=$(git rev-parse --short HEAD)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Run the Browserstack tests
for STAGE in 1 2 3
do
  echo
  printf "\033[34m"
  printf "Running browserstack test of stage $STAGE"
  printf "\033[0m"
  echo

  GITHEAD_SHORT="$GITHEAD_SHORT" \
  CURRENT_BRANCH="$CURRENT_BRANCH" \
  BROWSERSTACK_STAGE=$STAGE \
  retry \
  --retries=$MAX_RETRIES \
  -- \
  karma start \
  ./build/karma/browserstack.js
done
