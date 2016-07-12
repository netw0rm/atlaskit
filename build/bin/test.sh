#!/bin/sh
set -e

FAILED_CI_FILE=.ci_failed

# Clears the file each time we run
rm -f $FAILED_CI_FILE

# Run the local unit tests, temporarily ignore failures
FAILED_CI_FILE=$FAILED_CI_FILE node ./node_modules/lerna/bin/lerna.js exec -- ../../build/bin/test.karma.nofail.sh

# Check if any components failed local unit tests
if [ -f $FAILED_CI_FILE ]; then
    echo "The following components failed local unit tests:"
    cat $FAILED_CI_FILE
    exit 1
fi

echo "Yay! All local unit tests passed"
