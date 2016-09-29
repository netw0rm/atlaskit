#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

mkdir -p ../../$OUTDIR/$PKG
cd ./stats
find ./ -name '*.html' -exec cp -prv '{}' "../../../$OUTDIR/$PKG" ';'
