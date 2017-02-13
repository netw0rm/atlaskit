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
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/docs"


# get list of changed packages in the form @atlaskit/package1,@atlaskit/package2
PACKAGES=$($BASEDIR/_get.changed.packages.js)

function docs_build_status() {
  build_status \
    "DOCS" \
    "Documentation" \
    "The docs for this pull request" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$BUILD_SPECIFIC_URL_PART/"
}

function generate_docs() {
  $CHALK --no-stdin -t "{blue Generating docs HTML output from README.md files...}"
  # generate the readme.md files
  $LERNA_LOC exec --scope="{$PACKAGES}" -- ../../build/bin/generate.readme.sh
  # generate the html for those readmes
  $LERNA_LOC exec --scope="{$PACKAGES}" -- ../../build/bin/generate.readme.html.sh

  $CHALK --no-stdin -t "{blue Generating docs index...}"
  pushd $OUTDIR > /dev/null
  indexifier --html . > index.html
  popd > /dev/null
}

docs_build_status "INPROGRESS"
generate_docs
cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
docs_build_status "SUCCESSFUL"
