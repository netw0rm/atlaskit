#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)
CDN_PREFIX="pr/stories"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
. $BASEDIR/_build_status.sh

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

storybook_build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Building storybook (PR)}"
mkdir -p ../atlaskit-stories
npm run storybook/static -- -o stories/$BUILD_SPECIFIC_URL_PART
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

$CHALK --no-stdin -t "{blue Uploading storybook (PR) to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/$CDN_PREFIX" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/$CDN_PREFIX" \
"../ak-storybooks-cdn.zip"

storybook_build_status "SUCCESSFUL"
