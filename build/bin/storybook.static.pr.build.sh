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

# get list of changed packages which should have been outputted by generate.changed.packages.file.sh
CHANGED_PACKAGES=$(cat changed-packages)

$CHALK --no-stdin -t "{green -- Changed Packages --}"
echo "$CHANGED_PACKAGES"

function build_storybook() {
  local TARGET_PATH="$1"

  $CHALK --no-stdin -t "{blue Building storybook (PR)}"
  $LERNA_LOC exec --scope "$CHANGED_PACKAGES" -- ../../build/bin/storybook.static.pr.single.sh "$TARGET_PATH"
  $BASEDIR/generate.index.html.js $TARGET_PATH "PR storybook for ${BITBUCKET_COMMIT}" > "$TARGET_PATH/index.html"
}

# if we had any changed packages (string is not empty)
if [ -n "$CHANGED_PACKAGES" ] ; then
  build_storybook "$STORYBOOK_OUTDIR"
fi
