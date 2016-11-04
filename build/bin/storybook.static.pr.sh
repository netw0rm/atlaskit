#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)
CDN_PREFIX="pr/stories"
AK_PATH="$CDN_URL_SCOPE/$CDN_PREFIX"
BUILD_SPECIFIC_URL_PART="$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME"
AK_PATH_SHA="$AK_PATH/$BUILD_SPECIFIC_URL_PART"
OUTDIR=$(mktemp -d)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$AK_PATH_SHA/"
}

function build_storybook() {
  local TARGET_PATH="$1"

  $CHALK --no-stdin -t "{blue Building storybook (PR)}"
  npm run storybook/static -- -o "$TARGET_PATH"
}

storybook_build_status "INPROGRESS"
build_storybook "$OUTDIR"
cdn_publish_folder "$OUTDIR" "$CDN_PREFIX/$BUILD_SPECIFIC_URL_PART"
storybook_build_status "SUCCESSFUL"
