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

OUTDIR=$(mktemp -d)
BUILD_SPECIFIC_URL_PART="$CHANGED_PACKAGES/coverage/html"

function coverage_build_status() {
  build_status \
    "Coverage reports" \
    "Coverage reports" \
    "The coverage reports for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/index.html"
}

function build_coverage_report() {
  local TARGET_PATH="$1"

  $CHALK --no-stdin -t "{blue Creating coverage reports for (PR)}"
  echo "$CHANGED_PACKAGES"
  $LERNA_LOC exec --scope "$CHANGED_PACKAGES" -- echo $CHANGED_PACKAGES
  $LERNA_LOC exec -- ls -la
  $LERNA_LOC exec -- cp -r "coverage" "$TARGET_PATH"
}

coverage_build_status "INPROGRESS"
# if we had any changed packages (string is not empty)
if [ -n "$CHANGED_PACKAGES" ] ; then
  build_coverage_report "$OUTDIR"
  cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
fi
coverage_build_status "SUCCESSFUL"
