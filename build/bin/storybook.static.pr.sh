#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
GITHEAD=$(git rev-parse HEAD)

$BASEDIR/_install_cdn_tools.sh

echo "Building storybooks"
mkdir -p ../atlaskit-stories
npm run storybook/static -- -o stories/$GITHEAD
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

echo "Uploading storybooks to CDN..."
java \
-jar \
-Dlog4j.configurationFile=build/bin/logger.xml \
../prebake-distributor-runner.jar \
--step=resources \
--s3-bucket=$S3_BUCKET \
--s3-key-prefix="$S3_KEY_PREFIX/pr/stories" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/pr/stories" \
--compress=css,js,svg,ttf,html,json,ico,eot,otf \
--pre-bake-bundle=../ak-storybooks-cdn.zip

# Invalidate CDN caches
echo "CDN invalidation (storybooks) starting now (this may take some time)"

AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- EVOK132JF0N16 "/atlaskit/pr/stories/$GITHEAD/*"
echo "CDN invalidation (storybooks) finished."
