#!/bin/sh

# This runs Karma (for CI via Lerna) but pipes errors to a temporarily
# file so that Lerna doesn't stop.

{
    karma start ../../karma.conf.js --single-run
} || {
    echo $(pwd) >> ../../$FAILED_CI_FILE
}
