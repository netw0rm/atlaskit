#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/coverage"
BASEDIR=$(dirname $0)
OUTDIR=$(mktemp -d)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

function stats_build_status() {
  build_status \
    "COVERAGE" \
    "Coverage" \
    "The test coverage for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/"
}

function print_coverage() {
  $CHALK --no-stdin -t "{blue Coverage statistics for this PR:}"
  cat ./coverage/coverage.txt
}

stats_build_status "INPROGRESS"
print_coverage
cdn_publish_folder "./coverage/html" "$BUILD_SPECIFIC_URL_PART"
stats_build_status "SUCCESSFUL"
