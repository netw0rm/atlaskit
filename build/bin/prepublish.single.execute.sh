#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)

pushd ../.. > /dev/null
CHALK="`npm bin`/chalk"
popd > /dev/null

$BASEDIR/generate.readme.sh

$CHALK blue "Generating UMD bundle..."
webpack --config ../../build/webpack/production-umd.js $@

$CHALK blue "Generating CJS bundle..."
webpack --config ../../build/webpack/production-cjs.js $@

$CHALK blue "Generating bundle with dependencies..."
webpack --config ../../build/webpack/production-with-deps.js $@
