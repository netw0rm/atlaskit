#!/usr/bin/env bash
set -e

# Paths for binaries in our node_modules
BIN_PATH=$(yarn bin)
CHALK="$BIN_PATH/chalk"
LERNA_LOC="$BIN_PATH/lerna"

# Paths for our build scripts
BASEDIR=$(dirname $0)

# source build scripts to get functions from them
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

OUTDIR=$(mktemp -d)
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/storybook"

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
  $LERNA_LOC exec --scope "{$PACKAGES}" -- ../../build/bin/storybook.static.pr.single.sh "$TARGET_PATH"
  $BASEDIR/generate.index.html.js $TARGET_PATH "PR storybook for ${BITBUCKET_COMMIT}" > "$TARGET_PATH/index.html"
}

#storybook_build_status "INPROGRESS"
build_storybook "$OUTDIR"
#cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
#storybook_build_status "SUCCESSFUL"
