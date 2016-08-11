#!/usr/bin/env bash
set -e

COMPONENT_DIR=$(basename `pwd`)


echo
echo -e "\033[34mTesting $COMPONENT_DIR\033[0m"

if [ -n "$BROWSERSTACK" ]; then
  retry="retry --retries=2 -- "
  if [ -n "$BRANCH_BUILD" ]; then
    KARMA_CONF="./karma.conf.browserstack.branch.js"
  else
    KARMA_CONF="./karma.conf.browserstack.master.js"
  fi
else
  retry=""
  KARMA_CONF="../../karma.conf.js"
fi

# Run the tests if in Browserstack mode, or if test/ dir exists for Lerna
if [ -n "$BROWSERSTACK" ] || [ -d "test" ]; then
    $retry karma start $KARMA_CONF --single-run --reporters=dots,junit $@
else
    echo -e "\033[34mNo 'test' dir in $COMPONENT_DIR; Skipping tests.\033[0m"
fi
