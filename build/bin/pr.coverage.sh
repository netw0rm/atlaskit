#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="pr/coverage"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
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
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

function print_coverage() {
  $CHALK --no-stdin -t "{blue Coverage statistics for this PR:}"
  cat ./coverage/coverage.txt
}

function gather_coverage() {
  $CHALK --no-stdin -t "{blue Gathering coverage files...}"
  mv -f ./coverage/html "$1"
}

stats_build_status "INPROGRESS"
print_coverage
gather_coverage "$OUTDIR"
cdn_publish_folder "$OUTDIR" "$CDN_PREFIX/$BUILD_SPECIFIC_URL_PART"
stats_build_status "SUCCESSFUL"
