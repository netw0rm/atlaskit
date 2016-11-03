#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="pr/coverage"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
AK_PATH_SHA="$AK_PATH/$BITBUCKET_COMMIT"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh

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
OUTDIR="$TEMP_DIR/resources/$BITBUCKET_COMMIT";
mkdir -p "$TEMP_DIR/resources/"
mv -f ./coverage/html $OUTDIR

ZIP_FILE="../ak-coverage-cdn.zip"
$CHALK --no-stdin -t "{blue Packaging coverage}"
rm -f $ZIP_FILE
zip -0 -r -T $ZIP_FILE $TEMP_DIR/resources

URL_EXISTED=$(url_exists "$AK_PATH_SHA/")

$CHALK --no-stdin -t "{blue Uploading coverage to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/$CDN_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$CDN_PREFIX" \
"$ZIP_FILE"

if [ "$URL_EXISTED" == "1" ]; then
  cf_invalidate "/$AK_PATH_SHA/*"
fi

stats_build_status "SUCCESSFUL"
