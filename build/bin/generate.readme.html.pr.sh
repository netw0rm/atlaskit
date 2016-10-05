#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
GITHEAD_SHORT=$(git rev-parse --short HEAD)
CDN_PREFIX="pr/docs"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
AK_PATH_SHA="$AK_PATH/$BITBUCKET_COMMIT"

BUILD_URL="$CDN_URL_BASE/$AK_PATH_SHA/"
BUILD_KEY="DOCS-$GITHEAD_SHORT"
BUILD_NAME="Docs"
BUILD_DESCRIPTION="The docs for this pull request"

$CHALK --no-stdin -t "{blue Post build in progress status}"
bbuild \
--commit "$BITBUCKET_COMMIT" \
--repo "$BITBUCKET_REPO_SLUG" \
--owner "$BITBUCKET_REPO_OWNER" \
--username "$BITBUCKET_USER" \
--password "$BITBUCKET_PASSWORD" \
--key "$BUILD_KEY" \
--name "$BUILD_NAME" \
--description "$BUILD_DESCRIPTION" \
--url "$BUILD_URL" \
--state "INPROGRESS"

$CHALK --no-stdin -t "{blue Generating docs HTML output from README.md files...}"
rm -rf ../atlaskit-docs
OUTDIR="../atlaskit-docs/resources/$BITBUCKET_COMMIT";
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

# Invalidate CDN caches
$CHALK --no-stdin -t "{blue CDN invalidation (docs) starting now (this may take some time)}"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION "/$AK_PATH_SHA/*"

$CHALK --no-stdin -t "{blue Post docs URL to build}"
bbuild \
--commit "$BITBUCKET_COMMIT" \
--repo "$BITBUCKET_REPO_SLUG" \
--owner "$BITBUCKET_REPO_OWNER" \
--username "$BITBUCKET_USER" \
--password "$BITBUCKET_PASSWORD" \
--key "$BUILD_KEY" \
--name "$BUILD_NAME" \
--description "$BUILD_DESCRIPTION" \
--url "$BUILD_URL" \
--state "SUCCESSFUL"
