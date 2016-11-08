#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
BUILD_SPECIFIC_URL_PART="pr/$BITBUCKET_COMMIT/$CURRENT_BUILD_TIME/docs"
BASEDIR=$(dirname $0)
OUTDIR=$(mktemp -d)
export OUTDIR="$OUTDIR"
. $BASEDIR/_build_status.sh
. $BASEDIR/_cdn_publish_folder.sh

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
  lerna exec -- ../../build/bin/generate.readme.html.sh

  $CHALK --no-stdin -t "{blue Generating docs index...}"
  pushd $OUTDIR > /dev/null
  indexifier --html . > index.html
  popd > /dev/null
}

docs_build_status "INPROGRESS"
generate_docs
cdn_publish_folder "$OUTDIR" "$BUILD_SPECIFIC_URL_PART"
docs_build_status "SUCCESSFUL"
