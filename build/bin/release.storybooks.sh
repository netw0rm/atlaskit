#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh

function storybooks_build_status() {
  build_status \
    "SBOOKS" \
    "Storybooks" \
    "The component storybooks" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/registry/"
}

storybooks_build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Building storybooks}"
mkdir -p ../atlaskit-stories
npm run storybook/static/registry
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

$CHALK --no-stdin -t "{blue Uploading storybooks to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/stories" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/stories" \
"../ak-storybooks-cdn.zip"

# Invalidate CDN cache
cf_invalidate "/atlaskit/stories/*"

storybooks_build_status "SUCCESSFUL"
