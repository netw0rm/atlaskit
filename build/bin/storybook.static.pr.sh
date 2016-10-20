#!/usr/bin/env bash
set -e

CHALK="`yarn bin`/chalk"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/atlaskit/pr/stories/$BITBUCKET_COMMIT/"
}

storybook_build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Building storybook (PR)}"
mkdir -p ../atlaskit-stories
yarn run storybook/static -- -o stories/$BITBUCKET_COMMIT
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

$CHALK --no-stdin -t "{blue Uploading storybook (PR) to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/pr/stories" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/pr/stories" \
"../ak-storybooks-cdn.zip"

# Invalidate CDN caches
$CHALK --no-stdin -t "{blue CDN invalidation (storybook) starting now (this may take some time)}"
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate -- $CLOUDFRONT_DISTRIBUTION "/atlaskit/pr/stories/$BITBUCKET_COMMIT/*"

storybook_build_status "SUCCESSFUL"
