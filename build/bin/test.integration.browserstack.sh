#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG=$(basename $PWD)

if [ -d "cucumber" ]; then
    echo "$PKG: Running integration tests on BrowserStack"
    PKG=$PKG PATH="../../node_modules/.bin:$PATH" BASE_URL="http://localhost:9001" protractor ../../protractor.conf.browserstack.js
else
    echo "$PKG: Skipping integration tests since no cucumber/ dir"
fi
