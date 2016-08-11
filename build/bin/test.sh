#!/usr/bin/env bash
set -e

COMPONENT_DIR=$(basename `pwd`)


if [ -d "test" ]; then
    echo
    echo -e "\033[34mTesting $COMPONENT_DIR\033[0m"

    if [ -n "$BROWSERSTACK" ]; then
      retry="retry --retries=2 -- "
      if [ -n "$BRANCH_BUILD" ]; then
        KARMA_CONF="../../karma.conf.browserstack.branch.js"
      else
        KARMA_CONF="../../karma.conf.browserstack.master.js"
      fi
    else
      retry=""
      KARMA_CONF="../../karma.conf.js"
    fi

    $retry karma start $KARMA_CONF --single-run --reporters=dots,junit $@
else
    echo -e "\033[34mNo 'test' dir in packages/$COMPONENT_DIR; Skipping tests.\033[0m"
fi
