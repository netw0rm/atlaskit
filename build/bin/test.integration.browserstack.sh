#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG=$($BASEDIR/_get_package_name.sh)

pushd ../.. > /dev/null
CHALK="`npm bin`/chalk"
PROTRACTOR_LOC="`npm bin`/protractor"
popd > /dev/null

if [ -d "cucumber" ]; then
    $CHALK --no-stdin -t "{blue $PKG: Running integration tests on BrowserStack}"
    PKG=$PKG \
    BASE_URL="http://localhost:9001" \
    $PROTRACTOR_LOC ../../build/protractor/browserstack.js
else
    $CHALK --no-stdin -t "{blue $PKG: Skipping integration tests since no cucumber/ dir}"
fi
