#!/bin/bash

# This runs Karma (for CI via Lerna) but pipes errors to a temporarily
# file so that Lerna doesn't stop.

COMPONENT_DIR=$(basename `pwd`)

{
    if [ -d "test" ]; then
        karma start ../../karma.conf.js --single-run --reporters=progress,junit
    else
        echo -e "\033[34m No 'test' dir in packages/$COMPONENT_DIR; Skipping tests."
        echo -e "\033[0m"
    fi
} || {
    if [ -n $FAILED_CI_FILE ]; then
        echo $COMPONENT_DIR >> ../../$FAILED_CI_FILE
    fi
}
