#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="pr/coverage"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh

function stats_build_status() {
  build_status \
    "COVERAGE" \
    "Coverage" \
    "The test coverage for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

stats_build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Coverage statistics for this PR:}"
cat ./coverage/coverage.txt

$CHALK --no-stdin -t "{blue Gathering coverage files...}"

TEMP_DIR="../atlaskit-stats"
rm -rf $TEMP_DIR
OUTDIR="$TEMP_DIR/resources/$BUILD_SPECIFIC_URL_PART";
mkdir -p $OUTDIR
mv -f ./coverage/html $OUTDIR

ZIP_FILE="../ak-coverage-cdn.zip"
$CHALK --no-stdin -t "{blue Packaging coverage}"
rm -f $ZIP_FILE
zip -0 -r -T $ZIP_FILE $TEMP_DIR/resources

$CHALK --no-stdin -t "{blue Uploading coverage to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/$CDN_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$CDN_PREFIX" \
"$ZIP_FILE"

stats_build_status "SUCCESSFUL"
