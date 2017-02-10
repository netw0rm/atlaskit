#!/usr/bin/env bash
set -e

CHALK="`yarn bin`/chalk"
BASEDIR=$(dirname $0)
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/storybook"
OUTDIR=$(mktemp -d)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

# get list of changed packages in the form @atlaskit/package1,@atlaskit/package2
PACKAGES=$($BASEDIR/_get.changed.packages.js)

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/index.html"
}

function build_storybook() {
  local TARGET_PATH="$1"

  $CHALK --no-stdin -t "{blue Building storybook (PR)}"
  lerna exec --scope "{$PACKAGES}" -- ../../build/bin/storybook.static.pr.single.sh "$TARGET_PATH"
  $BASEDIR/generate.index.html.js $TARGET_PATH "PR storybook for ${BITBUCKET_COMMIT}" > "$TARGET_PATH/index.html"
}

storybook_build_status "INPROGRESS"
build_storybook "$OUTDIR"
cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
storybook_build_status "SUCCESSFUL"
