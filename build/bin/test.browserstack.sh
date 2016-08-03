#!/bin/sh

FAILED_CI_FILE=.ci_failed

# Clears the file each time we run
rm -f $FAILED_CI_FILE

HEAD_SHA=$(git rev-parse HEAD | cut -c1-6)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Run the Browserstack tests 1 component at a time, temporarily ignore failures
FAILED_CI_FILE=$FAILED_CI_FILE HEAD_SHA=$HEAD_SHA CURRENT_BRANCH=$CURRENT_BRANCH BROWSERSTACK=1 `npm bin`/lerna exec --concurrency 1 -- ../../build/bin/test.sh --no-auto-watch

# Check if any components failed on Browserstack
if [ -f $FAILED_CI_FILE ]; then
    echo
    printf "\033[31m"
    echo "The following components failed Browserstack tests:"
    echo "---------------------------------------------------"
    cat $FAILED_CI_FILE
    echo "---------------------------------------------------"
    printf "\033[0m"
    exit 1
fi
printf "\033[32m"
echo "----------------------------------"
echo "Yay! All Browserstack tests passed"
echo "----------------------------------"
printf "\033[0m"
