#!/usr/bin/env bash
set -e

# Paths for binaries in our node_modules
BIN_PATH=$(yarn bin)
CHALK="$BIN_PATH/chalk"
CHANGED_PACKAGES=$(cat changed-packages)
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/storybook"

# Paths for our build scripts
BASEDIR=$(dirname $0)

function storybook_build_status() {
  build_status \
    "STORYBOOK" \
    "Storybook" \
    "The storybook for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/index.html"
}

# source build scripts to get functions from them
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

$CHALK --no-stdin -t "{green -- Publishing Storybook --}"

storybook_build_status "INPROGRESS"
# if we had any changed packages (string is not empty)
if [ -n "$CHANGED_PACKAGES" ] ; then
  cdn_publish_folder "$STORYBOOK_OUTDIR" "$BUILD_SPECIFIC_URL_PART"
fi
storybook_build_status "SUCCESSFUL"
