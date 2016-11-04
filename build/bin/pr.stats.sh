#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="pr/stats"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh

function stats_build_status() {
  build_status \
    "STATS" \
    "Statistics" \
    "The bundle statistics for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

stats_build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Gathering stats files...}"

rm -rf ../atlaskit-stats
OUTDIR="../atlaskit-stats/resources/$BUILD_SPECIFIC_URL_PART";
export OUTDIR="$OUTDIR"
lerna exec -- ../../build/bin/pr.stats.single.sh

$CHALK --no-stdin -t "{blue Generating stats index...}"
pushd $OUTDIR > /dev/null
indexifier --html . > index.html
popd > /dev/null

ZIP_FILE="../ak-stats-cdn.zip"
$CHALK --no-stdin -t "{blue Packaging stats}"
rm -f $ZIP_FILE
zip -0 -r -T $ZIP_FILE ../atlaskit-stats/resources

$CHALK --no-stdin -t "{blue Uploading stats to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/$CDN_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$CDN_PREFIX" \
"$ZIP_FILE"

stats_build_status "SUCCESSFUL"
