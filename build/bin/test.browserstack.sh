#!/bin/sh

FAILED_CI_FILE=.ci_failed

# Clears the file each time we run
rm -f $FAILED_CI_FILE

# Run the BNrowserstack tests 1 component at a time, temporarily ignore failures
FAILED_CI_FILE=$FAILED_CI_FILE BROWSERSTACK=1 node ./node_modules/lerna/bin/lerna.js exec --concurrency 1 -- ../../build/bin/test.karma.nofail.sh

# Check if any components failed on Browserstack
if [ -f $FAILED_CI_FILE ]; then
    echo "The following components failed Browserstack tests:"
    cat $FAILED_CI_FILE
    exit 1
fi

echo "Yay! All Browserstack tests passed"
