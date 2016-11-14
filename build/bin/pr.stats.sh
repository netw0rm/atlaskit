#!/usr/bin/env bash
set -e

CHALK="`yarn bin`/chalk"
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/stats"
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
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/"
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
cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
stats_build_status "SUCCESSFUL"
