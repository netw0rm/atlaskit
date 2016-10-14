#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
CHALK="`npm bin`/chalk"
popd > /dev/null

if [ -z ${RUN_DURING_INSTALL+x} ];
then
  # We are not running during install (e.g. we are running in dist mode, so we generate the bundles)

  $CHALK --no-stdin -t "{blue Generating CJS bundle...}"
  webpack --config ../../build/webpack/production-cjs.js $@

  $CHALK --no-stdin -t "{blue Generating UMD bundle...}"
  webpack --config ../../build/webpack/production-umd.js $@

  $CHALK --no-stdin -t "{blue Generating bundle with dependencies...}"
  webpack --config ../../build/webpack/production-with-deps.js $@
else
  # We are running in install mode, no need to generate bundles
  $CHALK --no-stdin -t "{blue Running in install mode, not generating bundles}"
fi
