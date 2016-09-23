#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG=$($BASEDIR/_get_package_name.sh)

if [ -d "cucumber" ]; then
    echo "$PKG: Running integration tests on BrowserStack"
    PKG=$PKG PATH="../../node_modules/.bin:$PATH" BASE_URL="http://localhost:9001" protractor ../../build/protractor/browserstack.js
else
    echo "$PKG: Skipping integration tests since no cucumber/ dir"
fi
