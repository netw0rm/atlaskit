#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
GITHEAD_SHORT=$(git rev-parse --short HEAD)

BUILD_URL="$CDN_URL_BASE/atlaskit/pr/stories/$BITBUCKET_COMMIT/"
BUILD_KEY="STORYBOOK-$GITHEAD_SHORT"
BUILD_NAME="Storybook"
BUILD_DESCRIPTION="The storybook for this pull request"

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

echo "Building storybooks"
mkdir -p ../atlaskit-stories
npm run storybook/static -- -o stories/$BITBUCKET_COMMIT
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
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION "/atlaskit/pr/stories/$BITBUCKET_COMMIT/*"
echo "CDN invalidation (storybooks) finished."

echo "Post storybook URL to build"

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
