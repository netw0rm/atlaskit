#!/usr/bin/env bash
set -e

# This script is run from inside each package using `lerna exec` (see the "storybook/static/registry") script

BASEDIR=$(dirname $0)
PKG=$($BASEDIR/_get_package_name.sh)
VERSION=$($BASEDIR/_get_package_version.sh)

pushd ../.. > /dev/null
CHALK="`yarn bin`/chalk"
popd > /dev/null

if [ -d "stories" ]; then
    $CHALK --no-stdin -t "{blue $PKG: Generating storybook}"
    cd ../..
    mkdir -p stories/$PKG/$VERSION
    yarn run storybook/static/single $PKG -- -o stories/$PKG/$VERSION
else
    $CHALK --no-stdin -t "{blue $PKG: Skipping storybook generation since no stories/ dir}"
fi
