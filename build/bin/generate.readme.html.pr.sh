#!/usr/bin/env bash
set -e

LERNA_LOC="`npm bin`/lerna"
GITHEAD_SHORT=$(git rev-parse --short HEAD)
CDN_PREFIX="pr/docs"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
AK_PATH_SHA="$AK_PATH/$BITBUCKET_COMMIT"

BUILD_URL="$CDN_URL_BASE/$AK_PATH_SHA/"
BUILD_KEY="DOCS-$GITHEAD_SHORT"
BUILD_NAME="Docs"
BUILD_DESCRIPTION="The docs for this pull request"

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

echo "Installing marky-markdown"
npm install -g marky-markdown@8.1.0

echo "Generating docs HTML output from README.md files..."

rm -rf ../atlaskit-docs
OUTDIR="../atlaskit-docs/resources/$BITBUCKET_COMMIT";
mkdir -p $OUTDIR
export OUTDIR="$OUTDIR"
$LERNA_LOC exec -- ../../build/bin/generate.readme.html.sh

echo "Generating docs index..."

INDEX_FILE="index.html"
echo "<html><ul>" > $INDEX_FILE
pushd $OUTDIR > /dev/null
find . -type f \( -name "*.html" ! -name "$INDEX_FILE" \) -exec echo "<li><a href=\"{}\">{}</a></li>" ";" > $INDEX_FILE
echo "</ul></html>" >> $INDEX_FILE
popd > /dev/null

ZIP_FILE="../ak-docs-cdn.zip"
echo "Packaging docs"
rm -f $ZIP_FILE
zip -0 -r -T $ZIP_FILE ../atlaskit-docs/resources

echo "Uploading docs to CDN..."
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
echo "CDN invalidation (docs) starting now (this may take some time)"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION "/$AK_PATH_SHA/*"
echo "CDN invalidation (docs) finished."

echo "Post docs URL to build"

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
