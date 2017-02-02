#!/usr/bin/env bash
set -e

CHALK="`yarn bin`/chalk"
BASEDIR=$(dirname $0)
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/storybook"
OUTDIR=$(mktemp -d)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/"
}

function build_storybook() {
  local TARGET_PATH="$1"

  $CHALK --no-stdin -t "{blue Building storybook (PR)}"
  lerna exec -- ../../build/bin/storybook.static.pr.single.sh "$TARGET_PATH"
  $BASEDIR/generate.index.html.js $TARGET_PATH > "$TARGET_PATH/index.html"
  $BASEDIR/generate.index.html.js $TARGET_PATH/@atlaskit > "$TARGET_PATH/@atlaskit/index.html"
}

storybook_build_status "INPROGRESS"
build_storybook "$OUTDIR"
cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
storybook_build_status "SUCCESSFUL"
