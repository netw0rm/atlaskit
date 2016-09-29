#!/usr/bin/env bash
set -e

LERNA_LOC="`npm bin`/lerna"
INDEXIFIER_LOC="`npm bin`/indexifier"
GITHEAD_SHORT=$(git rev-parse --short HEAD)
CDN_PREFIX="pr/stats"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
AK_PATH_SHA="$AK_PATH/$BITBUCKET_COMMIT"

BUILD_URL="$CDN_URL_BASE/$AK_PATH_SHA/"
BUILD_KEY="STATS-$GITHEAD_SHORT"
BUILD_NAME="Stats"
BUILD_DESCRIPTION="The stats for this pull request"

echo "Post build in progress status"
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

echo "Gathering stats files..."

rm -rf ../atlaskit-stats
OUTDIR="../atlaskit-stats/resources/$BITBUCKET_COMMIT";
export OUTDIR="$OUTDIR"
$LERNA_LOC exec -- ../../build/bin/pr.stats.single.sh

echo "Generating stats index..."
pushd $OUTDIR > /dev/null
$INDEXIFIER_LOC . > index.html
popd > /dev/null

ZIP_FILE="../ak-stats-cdn.zip"
echo "Packaging stats"
rm -f $ZIP_FILE
zip -0 -r -T $ZIP_FILE ../atlaskit-stats/resources

echo "Uploading stats to CDN..."
java \
-jar \
-Dlog4j.configurationFile=build/bin/logger.xml \
../prebake-distributor-runner.jar \
--step=resources \
--s3-bucket=$S3_BUCKET \
--s3-key-prefix="$S3_KEY_PREFIX/$CDN_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$CDN_PREFIX" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=$ZIP_FILE

# Invalidate CDN caches
echo "CDN invalidation (stats) starting now (this may take some time)"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION "/$AK_PATH_SHA/*"
echo "CDN invalidation (stats) finished."

echo "Post stats URL to build"

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
