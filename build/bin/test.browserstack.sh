#!/bin/sh

FAILED_CI_FILE=.ci_failed

# Clears the file each time we run
rm -f $FAILED_CI_FILE

# Run the Browserstack tests 1 component at a time, temporarily ignore failures
FAILED_CI_FILE=$FAILED_CI_FILE BROWSERSTACK=1 `npm bin`/lerna exec --concurrency 1 -- ../../build/bin/test.sh

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
echo           "----------------------------------"
printf "\033[32mYay! All Browserstack tests passed\033[0m\n"
echo           "----------------------------------"
