#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"
CDN_PREFIX="stories"
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh
. $BASEDIR/_cdn_publish_folder.sh

function storybooks_build_status() {
  build_status \
    "SBOOKS" \
    "Storybooks" \
    "The component storybooks" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/registry/"
}

function build_storybooks() {
  $CHALK --no-stdin -t "{blue Building storybooks}"
  npm run storybook/static/registry
}

storybooks_build_status "INPROGRESS"
build_storybooks
cdn_publish_folder "./stories" "$CDN_PREFIX"
cf_invalidate "/atlaskit/stories/*"
storybooks_build_status "SUCCESSFUL"
