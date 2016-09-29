#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

if [ -d "./stats" ]; then
  cd ./stats
  TARGET_DIR="../../../$OUTDIR/$PKG"
  mkdir -p $TARGET_DIR
  find ./ -name '*.html' -exec cp -prv '{}' "$TARGET_DIR" ';'
fi
