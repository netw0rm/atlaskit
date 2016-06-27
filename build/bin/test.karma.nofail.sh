#!/bin/sh

# This runs Karma (for CI via Lerna) but pipes errors to a temporarily
# file so that Lerna doesn't stop.

COMPONENT_DIR=$(basename `pwd`)

{
    if [ -d "test" ]; then
        echo "Running tests in packages/$COMPONENT_DIR."
        karma start ../../karma.conf.js --single-run
    else
        echo "No 'test' dir in packages/$COMPONENT_DIR; Skipping tests."
    fi
} || {
    if [ -n $FAILED_CI_FILE ]; then
        echo $COMPONENT_DIR >> ../../$FAILED_CI_FILE
    fi
}
