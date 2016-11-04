#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="pr/docs"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh

function docs_build_status() {
  build_status \
    "DOCS" \
    "Documentation" \
    "The docs for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

docs_build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Generating docs HTML output from README.md files...}"
rm -rf ../atlaskit-docs
OUTDIR="../atlaskit-docs/resources/$BUILD_SPECIFIC_URL_PART";
mkdir -p $OUTDIR
export OUTDIR="$OUTDIR"
lerna exec -- ../../build/bin/generate.readme.html.sh

$CHALK --no-stdin -t "{blue Generating docs index...}"
pushd $OUTDIR > /dev/null
indexifier --html . > index.html
popd > /dev/null

ZIP_FILE="../ak-docs-cdn.zip"
$CHALK --no-stdin -t "{blue Packaging docs}"
rm -f $ZIP_FILE
zip -0 -r -T $ZIP_FILE ../atlaskit-docs/resources

$CHALK --no-stdin -t "{blue Uploading docs to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/$CDN_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$CDN_PREFIX" \
"$ZIP_FILE"

docs_build_status "SUCCESSFUL"
