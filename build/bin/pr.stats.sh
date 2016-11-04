#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="pr/stats"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
BASEDIR=$(dirname $0)
OUTDIR=$(mktemp -d)
export OUTDIR="$OUTDIR"
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

function stats_build_status() {
  build_status \
    "STATS" \
    "Statistics" \
    "The bundle statistics for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

function gather_stats() {
  $CHALK --no-stdin -t "{blue Gathering stats files...}"
  lerna exec -- ../../build/bin/pr.stats.single.sh

  $CHALK --no-stdin -t "{blue Generating stats index...}"
  pushd $OUTDIR > /dev/null
  indexifier --html . > index.html
  popd > /dev/null
}

stats_build_status "INPROGRESS"
gather_stats
cdn_publish_folder "$OUTDIR" "$CDN_PREFIX/$BUILD_SPECIFIC_URL_PART"
stats_build_status "SUCCESSFUL"
