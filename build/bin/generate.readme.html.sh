#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

if [ -e "README.md" ]; then
  marky-markdown README.md > ../../$OUTDIR/$PKG.html
fi
