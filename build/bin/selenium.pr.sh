#!/usr/bin/env bash
set -e

BIN_PATH=$(yarn bin)
CHALK="$BIN_PATH/chalk"
LERNA_LOC="$BIN_PATH/lerna"

CHANGED_PACKAGES=$(cat changed-packages)
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/allure"

# Port for local web server
PORT=8921

# Paths for our build scripts
BASEDIR=$(dirname $0)

# Paths for allure-results
ALLURE_RESULTS=$BASEDIR/../../allure-results

# source build scripts to get functions from them
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

function selenium_build_status() {
  build_status \
    "SELENIUM" \
    "Allure Report (Selenium Tests)" \
    "The allure report for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/index.html"
}

$CHALK --no-stdin -t "{green -- Running Selenium Tests for changed packages: --}"
echo "$CHANGED_PACKAGES"

selenium_build_status "INPROGRESS"

if [ -n "$CHANGED_PACKAGES" ] ; then
  # Cleaning up old results if exist
  $CHALK --no-stdin -t "{blue [SELENIUM] Removing old reports}"
  rm -rf ./allure-results 2> /dev/null

  # Start server for static storybook
  $CHALK --no-stdin -t "{blue [SELENIUM] Starting local web server for static storybooks}"
  $BASEDIR/_server-for-static-storybooks.js "$STORYBOOK_OUTDIR" $PORT &
  SERVER_PID=$!

  # Iterate over changed packages and run selenium tests for them
  $CHALK --no-stdin -t "{blue [SELENIUM] Running tests for changed packages}"
  $LERNA_LOC exec --scope "$CHANGED_PACKAGES" -- ../../build/bin/selenium.pr.single.sh "$PORT"

  # Stop server
  $CHALK --no-stdin -t "{blue [SELENIUM] Stopping local web server}"
  kill $SERVER_PID > /dev/null

  # Generating allure report entry point
  $CHALK --no-stdin -t "{blue [SELENIUM] Generating allure reports entry point}"
  $BASEDIR/_generate-allure-report-index.html.js > $ALLURE_RESULTS/index.html

  RESULTS_COUNT=$(find $ALLURE_RESULTS/* -maxdepth 0 -type d | wc -l)

  # Publishing report
  cdn_publish_folder "$ALLURE_RESULTS" "$BUILD_SPECIFIC_URL_PART"

  # Decide whether there was any failed tests or not
  if [ "$RESULTS_COUNT" -gt "0" ]
  then
    $CHALK --no-stdin -t "{red [SELENIUM] Some tests failed}"
    selenium_build_status "FAILED"
    exit 1
  fi

  $CHALK --no-stdin -t "{green [SELENIUM] All selenium tests were successful}"
  selenium_build_status "SUCCESSFUL"
else
  $CHALK --no-stdin -t "{yellow [SELENIUM] Skipping selenium tests}"
fi
