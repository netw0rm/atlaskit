#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
MARKYMD_LOC="`npm bin`/marky-markdown"
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

if [ -e "README.md" ]; then
  $MARKYMD_LOC README.md > ../../$OUTDIR/$PKG.html
fi
