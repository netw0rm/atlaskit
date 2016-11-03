#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)
CDN_PREFIX="pr/stories"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
AK_PATH_SHA="$AK_PATH/$BITBUCKET_COMMIT"
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh

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
npm run storybook/static -- -o stories/$BITBUCKET_COMMIT
mv ./stories ../atlaskit-stories/resources
rm -f ../ak-storybooks-cdn.zip
zip -0 -r -T ../ak-storybooks-cdn.zip ../atlaskit-stories/resources

URL_EXISTED=$(url_exists "$AK_PATH_SHA/")

$CHALK --no-stdin -t "{blue Uploading storybook (PR) to CDN...}"
prebake-distributor-runner \
--s3-bucket="$S3_BUCKET" \
--s3-key-prefix="$S3_KEY_PREFIX/pr/stories" \
--s3-gz-key-prefix="$S3_GZ_KEY_PREFIX/pr/stories" \
"../ak-storybooks-cdn.zip"

if [ "$URL_EXISTED" == "1" ]; then
  cf_invalidate "/$AK_PATH_SHA/*"
fi

storybook_build_status "SUCCESSFUL"
