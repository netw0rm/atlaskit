#!/usr/bin/env bash
set -e

CHALK="`yarn bin`/chalk"
CDN_PREFIX="registry"
BASEDIR=$(dirname $0)
OUTDIR=$(mktemp -d)
. $BASEDIR/_build_status.sh
. $BASEDIR/_cf_invalidate.sh
. $BASEDIR/_cdn_publish_folder.sh

function registry_build_status() {
  build_status \
    "REGISTRY" \
    "Registry" \
    "The component registry" \
    "$1" \
    "$CDN_URL_BASE/$CDN_URL_SCOPE/$CDN_PREFIX/"
}

function build_registry() {
  local TARGET_PATH="$1"
  local REGISTRY_BIN=`npm bin`/ak-registry
  local REGISTRY_PATH=`npm root`/@atlaskit/atlaskit-registry

  $CHALK --no-stdin -t "{blue Building registry}"
  pushd $REGISTRY_PATH > /dev/null
  NODE_ENV=production \
  BITBUCKET_PASS=$BITBUCKET_PW_READONLY \
  AK_REG_BUILD_DIR=$TARGET_PATH \
  $REGISTRY_BIN
  popd > /dev/null
}

registry_build_status "INPROGRESS"
build_registry "$OUTDIR"
cdn_publish_folder "$OUTDIR" "$CDN_PREFIX"
cf_invalidate "/atlaskit/registry/*"
registry_build_status "SUCCESSFUL"
