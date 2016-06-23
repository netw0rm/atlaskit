#!/bin/sh

# This runs Karma (for CI via Lerna) but pipes errors to a temporarily
# file so that Lerna doesn't stop.

COMPONENT_DIR=$(basename `pwd`)

{
    if [ -d "test" ]; then
        karma start ../../karma.conf.js --single-run
    else
        echo "No 'test' dir for $COMPONENT_DIR; Skipping tests."
    fi
} || {
    echo $COMPONENT_DIR >> ../../$FAILED_CI_FILE
}
