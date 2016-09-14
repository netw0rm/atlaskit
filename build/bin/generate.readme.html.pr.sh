#!/usr/bin/env bash
set -e

MARKYMD_LOC="`npm bin`/marky-markdown"
LERNA_LOC="`npm bin`/lerna"
BASEDIR=$(dirname $0)
GITHEAD=$(git rev-parse HEAD)

$BASEDIR/_install_cdn_tools.sh

echo "Generating docs HTML output from README.md files..."

rm -rf ../atlaskit-docs
OUTDIR="../atlaskit-docs/resources/$GITHEAD";
mkdir -p $OUTDIR
export OUTDIR="$OUTDIR"
$LERNA_LOC exec -- ../../build/bin/generate.readme.html.sh

echo "Removing empty files..."
find $OUTDIR -size  0 -print0 | xargs -0 rm

echo "Generating docs index..."

INDEX_FILE="index.html"
echo "<html><ul>" > $INDEX_FILE
pushd $OUTDIR > /dev/null
find . -type f \( ! -name ".html" \) -exec echo "<li><a href=\"{}\">{}</a></li>" ";" > $INDEX_FILE
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
--s3-key-prefix="$S3_KEY_PREFIX/pr/docs" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/pr/docs" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=$ZIP_FILE

# Invalidate CDN caches
echo "CDN invalidation (docs) starting now (this may take some time)"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- EVOK132JF0N16 "/atlaskit/pr/docs/$GITHEAD/*"
echo "CDN invalidation (docs) finished."

echo "Post docs URL to build"
BB_BUILD_STATUS_URL="https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit/commit/$GITHEAD/statuses/build"
DOCS_URL="https://aui-cdn.atlassian.com/atlaskit/pr/docs/$GITHEAD/"
GITHEAD_SHORT=$(git rev-parse --short HEAD)
curl -sS --fail -u $BITBUCKET_USER:$BITBUCKET_PASSWORD -d "{\"key\":\"DOCS-$GITHEAD_SHORT\",\"state\":\"SUCCESSFUL\",\"name\":\"Docs\",\"description\":\"The docs for this pull request\",\"url\":\"$DOCS_URL\"}" -H 'Content-Type: application/json' $BB_BUILD_STATUS_URL
