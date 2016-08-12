#!/usr/bin/env bash

# This runs Karma (for CI via Lerna) but pipes errors to a temporarily
# file so that Lerna doesn't stop.

COMPONENT_DIR=$(basename `pwd`)

{
    if [ -d "test" ]; then
        echo
        echo -e "\033[34mTesting $COMPONENT_DIR\033[0m"

        if [ -n "$FAILED_CI_FILE" ]; then
          retry="retry --retries=2 -- "
        else
          retry=""
        fi

        if [ -n "$BROWSERSTACK" ]; then
          if [ -n "$BRANCH_BUILD" ]; then
            KARMA_CONF="../../karma.conf.browserstack.branch.js"
          else
            KARMA_CONF="../../karma.conf.browserstack.master.js"
          fi
        else
          KARMA_CONF="../../karma.conf.js"
        fi

        $retry karma start $KARMA_CONF --single-run --reporters=dots,junit $@
    else
        echo -e "\033[34mNo 'test' dir in packages/$COMPONENT_DIR; Skipping tests.\033[0m"
    fi
} || {
    if [ -n "$FAILED_CI_FILE" ]; then
        echo $COMPONENT_DIR >> ../../$FAILED_CI_FILE
    else
      exit 1
    fi
}
